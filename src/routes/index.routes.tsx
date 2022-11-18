import React from "react";

const { Navigator, Screen } = createStackNavigator();
import { useTheme } from 'styled-components'
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "../screens/Dashboard";

export function IndexRoutes() {

    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
            />
        </Navigator>
    )
}