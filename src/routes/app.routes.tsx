import React from "react";
import { Platform } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Navigator, Screen } = createBottomTabNavigator();
import { AllAnimalsDashboard } from '../screens/AllAnimalsDashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'
import { KeyboardAvoidingView } from 'react-native'
import { Login } from "../screens/Login";
import { VaccineRegister } from "../screens/VaccineRegister";


export function AppRoutes() {

    const theme = useTheme();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>

            <Screen
                name="Login"
                component={Login}
                options={{
                    tabBarIconStyle: { display: "none" }
                }}
            />
            <Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.text,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarStyle: {
                        height: 75,
                        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    }
                }}
            >
                <Screen
                    name="Listagem"
                    component={AllAnimalsDashboard}
                    options={{
                        tabBarIcon: (({ size, color }) =>
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        )
                    }}
                />
                <Screen
                    name="Cadastrar"
                    component={VaccineRegister}
                    options={{
                        tabBarIcon: (({ size, color }) =>
                            <MaterialIcons
                                name="attach-money"
                                size={size}
                                color={color}
                            />
                        )
                    }}
                /><Screen
                    name="Resumo"
                    component={Register}
                    options={{
                        tabBarIcon: (({ size, color }) =>
                            <MaterialIcons
                                name="pie-chart"
                                size={size}
                                color={color}
                            />
                        )
                    }}
                />
            </Navigator>
        </KeyboardAvoidingView>
    )
}