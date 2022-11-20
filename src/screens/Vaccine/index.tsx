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
import { VaccineCardProps } from "../../components/VaccineCard";
import { ButtonComponent } from "../../components/Form/Button";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { VaccineCard } from "../../components/VaccineCard";


export interface VacineListProps extends VaccineCardProps {
    id: string;
}

type RouteParams = {
    id: string;
}

export function Vaccine() {

    const route = useRoute();
    const { id } = route.params as RouteParams;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<VacineListProps[]>([]);

    const navigator = useNavigation();

    const { user } = useAuth();
    const { signOut } = useAuth();


    async function loadAllAnimals() {

        const collectionKey = `@petapp:vaccines-${id}`;
        const response = await AsyncStorage.getItem(collectionKey);
        const allVaccines = response ? JSON.parse(response) : [];

        const allVaccinesFormatted: VacineListProps[] = allVaccines
            .map((vaccine: VacineListProps) => {
                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(vaccine.date))
                return {
                    id: vaccine.id,
                    name: vaccine.name,
                    category: vaccine.category,
                    date: date,
                }
            })
        setData(allVaccinesFormatted);
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

    function handleOpenDetails(pet: VacineListProps) {
        const name = pet.name;
        const id = pet.id;
        navigator.navigate('Dashboard' as never, { id, name } as never)
    }

    function LeftAction() {
        return (
            <View style={styles.leftAction}>
                <Icon name="trash-alt" size={25} color="white" />
            </View>
        )
    }

    function handleLeft(procedure: VacineListProps) {
        Alert.alert(
            'Excluir Item',
            'O item selecionado será removido, deseja continuar?',
            [
                { text: "Cancelar", style: 'cancel', onPress: () => { } },

                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => { deletar(procedure.id) }
                },
            ]
        );
    }


    async function deletar(idToDelete: string) {
        try {
            const usersJSON = await AsyncStorage.getItem(`@petapp:vaccines-${id}`);
            const usersArray = JSON.parse(usersJSON!);
            const alteredUsers = usersArray.filter(function (e: VacineListProps) {
                return e.id !== idToDelete
            })
            AsyncStorage.setItem(`@petapp:vaccines-${id}`, JSON.stringify(alteredUsers));
            loadAllAnimals();
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <Container>
            <Header>
                <Title>
                    Medicamentos
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
                                    <VaccineCard
                                        data={item}
                                    />
                                </Swipeable>
                            }
                        />
                        :
                        <EmptyListText>Ainda não existem animais cadastrados.</EmptyListText>
                }
                <Footer>
                    <ButtonComponent
                        title="Cadastrar Vacina"
                        onPress={() => navigator.navigate('ModalVacina' as never, { id } as never)}
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