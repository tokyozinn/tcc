import React from "react";

const { Navigator, Screen } = createStackNavigator();
import { useTheme } from 'styled-components'
import { Login } from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";

export function AuthRoutes() {

    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Login"
                component={Login}
            />
        </Navigator>
    )
}