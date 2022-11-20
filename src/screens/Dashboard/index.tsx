import React from "react";
import { useRoute } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
} from "./styles";
import { View } from "react-native";
import { DashboardCard } from "../../components/DashboardCard";

type RouteParams = {
    id: string;
    name: string;
}

export function Dashboard() {
    const route = useRoute();
    const { id, name } = route.params as RouteParams;

    return (
        <Container>
            <View>
                <Header>
                    <Title>
                        {name}
                    </Title>
                </Header>
                <View>
                    <DashboardCard icon="Vacina" title="Vacinas" />
                    <DashboardCard icon="Balanca" title="Controle de Peso" />
                </View>
            </View>
        </Container>
    )
}