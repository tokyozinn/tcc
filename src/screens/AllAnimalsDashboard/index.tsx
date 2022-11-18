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
    AnimalCards,
    LogoutButton,
    LoadContainer,
    EmptyListText,
    AnimalsList,
    NewPetButton,
} from "./styles";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";
import { AnimalCard, AnimalCardProps } from "../../components/AnimalCard";
import { Button } from "../../components/Form/Button";

export interface AnimalListProps extends AnimalCardProps {
    id: string;
}

export function AllAnimalsDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<AnimalListProps[]>([]);

    const { user } = useAuth();
    const { signOut } = useAuth();

    async function loadAllAnimals() {

        const collectionKey = '@petapp:animals';
        const response = await AsyncStorage.getItem(collectionKey);
        const allAnimals = response ? JSON.parse(response) : [];

        const allAnimalsFormatted: AnimalListProps[] = allAnimals
            .map((pet: AnimalListProps) => {
                return {
                    name: pet.name,
                    specie: pet.specie,
                }
            })
        setData(allAnimalsFormatted);
        console.log(allAnimalsFormatted);
        setIsLoading(false);
    };

    async function clearDataBase() {
        const collectionKey = '@petapp:animals';
        AsyncStorage.removeItem(collectionKey);
        Alert.alert('database cleared');
    }

    useEffect(() => {
        loadAllAnimals();
    }, []);

    useFocusEffect(useCallback(() => {
        loadAllAnimals()
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
                                <LogoutButton onPress={() => clearDataBase()}>
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>

                        <AnimalCards>
                            {
                                data.length > 0 ? <AnimalsList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => <AnimalCard data={item} />}
                                /> :
                                    <EmptyListText>Ainda não existem animais cadastrados.</EmptyListText>
                            }

                        </AnimalCards>
                        
                        <NewPetButton>

                        </NewPetButton>
                    </>
            }
        </Container>

    )
}
