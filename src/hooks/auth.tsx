import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';

import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signIn(): Promise<void>;
    signOut(): Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const userCollectionKey = "@gofinances:user";
    const [isLoading, setIsLoading] = useState(true);

    async function signIn() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
        
            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const userLoggedIn = {
                    id: String(userInfo.id),
                    email: userInfo.email!,
                    name: userInfo.given_name!,
                    photo: userInfo.picture!
                }
                setUser(userLoggedIn);
                await AsyncStorage.setItem(userCollectionKey, JSON.stringify(userLoggedIn));
            }

        } catch (error) {
            throw new Error(error as string);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userCollectionKey);
    }

    useEffect(() => {
        async function loadUserData() {
            const userSaved = await AsyncStorage.getItem(userCollectionKey);
            if(userSaved){
                const userLogged = JSON.parse(userSaved) as User;
                setUser(userLogged);
            }
            setIsLoading(false);
        }
        loadUserData() 
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }