import React from "react";
import { useNavigation, useRoute } from '@react-navigation/native';


import {
    Container,
    Header,
    Title
} from "./styles";

type RouteParams = {
    id: string;
    name: string;
}

export function Dashboard() {
    const route = useRoute();
    const { id, name } = route.params as RouteParams;
   
    return (
        <Container>
                <Header>
                    <Title>
                        {name}
                    </Title>
                </Header>
        </Container>
    )
}