import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from 'react-native';
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
    LogoutButton,
    LoadContainer,
    EmptyListText,
} from "./styles";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps;
    expenditures: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const { user } = useAuth();
    const { signOut } = useAuth();

    async function loadTransaction() {
        const collectionKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(collectionKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesSum = 0;
        let expendituresSum = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesSum += Number(item.amount);
                };

                if (item.type === 'negative') {
                    expendituresSum += Number(item.amount);
                };

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
        setHighlightData({
            entries: {
                amount: entriesSum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expenditures: {
                amount: expendituresSum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount:
                    (entriesSum - expendituresSum).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
            }
        })
        setIsLoading(false);
    };


    async function clearDataBase() {
        const collectionKey = '@gofinances:transactions';
        AsyncStorage.removeItem(collectionKey);
        Alert.alert('database cleared');
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction()
    }, []
    ));

    return (
        <Container>
            {
                isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} /></LoadContainer> :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo source={{ uri: user.photo }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>{user.name}</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton onPress={() => signOut()}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>

                        <HighlightCards>
                            <HighlightCard
                                type="up"
                                title="Entradas"
                                amount={highlightData?.entries?.amount}
                                lastTransaction="Última entrada dia 13 de maio" />
                            <HighlightCard
                                type="down"
                                title="Saídas "
                                amount={highlightData?.expenditures?.amount}
                                lastTransaction="Última entrada dia 13 de maio" />
                            <HighlightCard
                                type="total"
                                title="Total"
                                amount={highlightData?.total?.amount}
                                lastTransaction="Última entrada dia 13 de maio" />
                        </HighlightCards>

                        <Transactions>
                            <Title>Listagem</Title>

                            {
                                data.length > 0 ? <TransactionList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => <TransactionCard data={item} />}
                                /> :
                                    <EmptyListText>Ainda não existem transações lançadas.</EmptyListText>
                            }

                        </Transactions>
                    </>
            }
        </Container>

    )
}
