import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    TransactionList,
    LogoutButton
} from "./styles";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransaction() {
        const collectionKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(collectionKey);

        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted : DataListProps[] = transactions
        .map((item: DataListProps) => {
            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        })
        setData(transactionsFormatted);

    }

    async function clearDataBase() {
        const collectionKey = '@gofinances:transactions';
        AsyncStorage.removeItem(collectionKey);
        Alert.alert('database cleared');
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction()},[]
    ));

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
                    <LogoutButton onPress={() => clearDataBase()}>
                        <Icon name="power" />
                    </LogoutButton>
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
