import React, { useContext, useState } from "react";
import { Alert, View } from 'react-native';

import {
    Container,
    UpperView,
    LowerView,
} from "./styles";
import GoogleSVG from '../../assets/google-icon.svg';
import LogoSVG from '../../assets/main-logo.svg';
import { RFValue } from "react-native-responsive-fontsize";
import { SignInButton } from "../../components/SignInButton";
import { useAuth } from "../../hooks/auth";

export function Login() {
    const { signIn } = useAuth();
    async function handleSignIn() {
        try {
            await signIn();
        } catch (error) {
            Alert.alert('error');
        }
    }

    return (
        <Container>

            <UpperView>
                <View>
                    <LogoSVG
                        width={RFValue(200)}
                        height={RFValue(200)}
                    />
                </View>

            </UpperView>
            <LowerView>
                <SignInButton
                    onPress={handleSignIn}
                    title="Entrar com Conta Google"
                    svg={GoogleSVG}
                ></SignInButton>
            </LowerView>

        </Container>

    )
}
