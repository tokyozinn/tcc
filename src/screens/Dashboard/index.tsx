import React from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

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
    const navigator = useNavigation();
    console.log(`OIEEEEEEE ${id} e ${name}`)

    return (
        <Container>
            <View>
                <Header>
                    <Title>
                        {name}
                    </Title>
                </Header>
                <View>
                    <DashboardCard icon="Vacina" title="Medicamentos" onPress={() => navigator.navigate('Vacinas' as never, {id, name} as never)}/>
                    <DashboardCard icon="Balanca" title="Controle de Peso" />
                </View>
            </View>
        </Container>
    )
}