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
    const data: DataListProps[]= [{
        id: '1',
        type: "positive",
        title: "Teste",
        amount: "R$ 1000",
        category: {
            name: "Investimento em NFT",
            icon: "dollar-sign"
        },
        date: "1-1-1"
    },
    {
        id: '2',
        type: "negative",
        title: "Teste",
        amount: "R$ 1000",
        category: {
            name: "Investimento em NFT",
            icon: "coffee"
        },
        date: "1-1-1"
    },
    {
        id: '3',
        type: "negative",
        title: "Teste",
        amount: "R$ 1000",
        category: {
            name: "Investimento em NFT",
            icon: "shopping-bag"
        },
        date: "1-1-1"
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
                    renderItem={({ item }) => <TransactionCard data={item} />
                    }

                />
            </Transactions>

        </Container>

    )
}
