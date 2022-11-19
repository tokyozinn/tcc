import React from "react";

const { Navigator, Screen } = createStackNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import { AllAnimalsDashboard } from "../screens/AllAnimalsDashboard";
import { VaccineRegister } from "../screens/VaccineRegister";
import { Dashboard } from "../screens/Dashboard";

export function IndexRoutes() {


    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Listagem"
                component={AllAnimalsDashboard}
            />
            <Screen
                name="NovoAnimal"
                component={VaccineRegister}
                />
            <Screen
                name="Dashboard"
                component={Dashboard}
                />
        </Navigator>
    )
}