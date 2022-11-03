import { createContext, ReactNode, useContext } from "react";
import * as AuthSession from 'expo-auth-session';

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
}

const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
    const user = {
        id: '213412',
        name: 'Andre',
        email: 'adfasd'
    }

    async function signIn() {
        try {
            const CLIENT_ID = '464889447980-uf6kd6eus96s2vkdms4gei091s06qn85.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@tokyozinn/tcc';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
    
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            
            const response = await AuthSession.startAsync({ authUrl })
            console.log(authUrl);
            console.log(response);

        } catch (error) {
            throw new Error();
        }
    }

    https://accounts.google.com/o/oauth2/v2/auth?client_id=464889447980-uf6kd6eus96s2vkdms4gei091s06qn85.apps.googleusercontent.com&redirect_uri=https://auth.expo.io/@tokyozinn/tcc&response_type=token&scope=profile%20email
return (
    <AuthContext.Provider value={{
        user,
        signIn
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