import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from 'react-native';

import {
    Container,
    UpperView,
    LowerView,
    LoadContainer,
    Photo,
} from "./styles";
import theme from "../../global/styles/theme";
import { Button } from "../../components/Form/Button";
import GoogleSVG from '../../assets/google-icon.svg';
import LogoSVG from '../../assets/main-logo.svg';
import { RFValue } from "react-native-responsive-fontsize";
import { SignInButton } from "../../components/SignInButton";

export function Login() {
    const [isLoading, setIsLoading] = useState(false);

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
                    title="Entrar com Conta Google"
                    svg={GoogleSVG}
                    ></SignInButton>
            </LowerView>

        </Container>

    )
}
