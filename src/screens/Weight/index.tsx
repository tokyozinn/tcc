import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { View, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Title,
    EmptyListText,
    VaccineList,
    Footer,
    Body,

} from "./styles";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import { ButtonComponent } from "../../components/Form/Button";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { WeightCard, WeightCardProps } from "../../components/WeightCard";


export interface WeightListProps extends WeightCardProps {
    id: string;
}

type RouteParams = {
    id: string;
}

export function Weight() {

    const route = useRoute();
    const { id } = route.params as RouteParams;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<WeightListProps[]>([]);

    const navigator = useNavigation();

    const { user } = useAuth();
    const { signOut } = useAuth();


    async function loadAllWeights() {

        const collectionKey = `@petapp:weight-${id}`;
        const response = await AsyncStorage.getItem(collectionKey);
        const allWeight = response ? JSON.parse(response) : [];

        const allWeightFormatted: WeightListProps[] = allWeight
            .map((weight: WeightListProps) => {
                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(weight.date))
                return {
                    id: weight.id,
                    weight: weight.weight,
                    date: date,
                }
            })
            console.log(allWeight);
        setData(allWeightFormatted);
        setIsLoading(false);
    };

    async function clearDataBase() {
        const collectionKey = '@petapp:animals';
        AsyncStorage.removeItem(collectionKey);
        Alert.alert('database cleared');
    }

    useEffect(() => {
        loadAllWeights();
    }, []);

    useFocusEffect(useCallback(() => {
        loadAllWeights()
    }, []
    ));

    function handleOpenDetails(weight: WeightListProps) {
        const name = weight.weight;
        const id = weight.id;
        navigator.navigate('Dashboard' as never, { id, name } as never)
    }

    function LeftAction() {
        return (
            <View style={styles.leftAction}>
                <Icon name="trash-alt" size={25} color="white" />
            </View>
        )
    }

    function handleLeft(weight: WeightListProps) {
        Alert.alert(
            'Excluir Item',
            'O item selecionado será removido, deseja continuar?',
            [
                { text: "Cancelar", style: 'cancel', onPress: () => { } },

                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => { deletar(weight.id) }
                },
            ]
        );
    }


    async function deletar(idToDelete: string) {
        try {
            const weightJSON = await AsyncStorage.getItem(`@petapp:weight-${id}`);
            const weightArray = JSON.parse(weightJSON!);
            const alteredWieghts = weightArray.filter(function (e: WeightListProps) {
                return e.id !== idToDelete
            })
            AsyncStorage.setItem(`@petapp:weight-${id}`, JSON.stringify(alteredWieghts));
            loadAllWeights();
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <Container>
            <Header>
                <Title>
                    Histórico de Peso
                </Title>
            </Header>
            <Body>
                {
                    data.length > 0 ?
                        <VaccineList
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <Swipeable
                                    renderLeftActions={LeftAction}
                                    onSwipeableLeftOpen={() => handleLeft(item)}
                                >
                                    <WeightCard
                                        data={item}
                                    />
                                </Swipeable>
                            }
                        />
                        :
                        <EmptyListText>Ainda não existem pesagens cadastradas.</EmptyListText>
                }
                <Footer>
                    <ButtonComponent
                        title="Cadastrar Peso"
                        onPress={() => navigator.navigate('ModalPeso' as never, { id } as never)}
                    />
                </Footer>
            </Body>
        </Container>
    )
}

const styles = StyleSheet.create({
    leftAction: {
        backgroundColor: '#e90000',
        justifyContent: 'center',
        flex: 1,
        marginTop: 24,
        marginRight: 24,
        marginLeft: 24,
        borderRadius: 5,
        paddingLeft: 20,
    }
});