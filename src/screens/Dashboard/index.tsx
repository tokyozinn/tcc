import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [{
        id: '1',
        type: "positive",
        title: "Salário",
        amount: "R$ 4.300,00",
        category: {
            name: "Salário",
            icon: "dollar-sign"
        },
        date: "01/05/2022"
    },
    {
        id: '2',
        type: "negative",
        title: "Compra do mês",
        amount: "R$ 1.000,00",
        category: {
            name: "Gastos com supermercado",
            icon: "coffee"
        },
        date: "22/05/2022"
    },
    {
        id: '3',
        type: "negative",
        title: "Manutenção Preventiva",
        amount: "R$ 550,98",
        category: {
            name: "Gastos com automóvel",
            icon: "shopping-bag"
        },
        date: "22/05/2022"
    },

    ];

    return (
        <Container>

            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://pps.whatsapp.net/v/t61.24694-24/258636966_2714580028845063_5182806451043426251_n.jpg?ccb=11-4&oh=01_AVwj_sMeMQ85YrrWHfSN4yvGrGSmTmVZnOzFwn05Hw1OZQ&oe=632432D4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Lucas Torres</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de maio" />
                <HighlightCard
                    type="down"
                    title="Saídas "
                    amount="R$ 1.200,00"
                    lastTransaction="Última entrada dia 13 de maio" />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.200,00"
                    lastTransaction="Última entrada dia 13 de maio" />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>

        </Container>

    )
}
