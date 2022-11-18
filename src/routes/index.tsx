import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { IndexRoutes } from "./index.routes";

export function Routes() {
    const { user } = useAuth();

    return (

        <NavigationContainer>
            {user.id ? <IndexRoutes/> : <AuthRoutes />}
        </NavigationContainer>
    );
}