import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import * as Font from 'expo-font';
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { ThemeProvider } from 'styled-components';
import theme from '../../global/styles/theme';
import { Dashboard } from '../Dashboard';
import { Register } from '../Register';


SplashScreen.preventAutoHideAsync();

export function Splash() {

    let customFonts = {
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    };

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync(customFonts);
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView}>
            <ThemeProvider theme={theme}>
                {/* <Dashboard /> */}
                <Register/>
            </ThemeProvider>
        </View>
    )
}

