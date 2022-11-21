import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { View, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    IconStyle,
    LogoutButton,
    LoadContainer,
    EmptyListText,
    AnimalsList,
    Footer,
    Body,

} from "./styles";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";
import { AnimalCard, AnimalCardProps } from "../../components/AnimalCard";
import { ButtonComponent } from "../../components/Form/Button";
import Swipeable from 'react-native-gesture-handler/Swipeable';


export interface AnimalListProps extends AnimalCardProps {
    id: string;
}


export function AllAnimalsDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<AnimalListProps[]>([]);

    const navigator = useNavigation();

    const { user } = useAuth();
    const { signOut } = useAuth();


    async function loadAllAnimals() {

        const collectionKey = '@petapp:animals';
        const response = await AsyncStorage.getItem(collectionKey);
        const allAnimals = response ? JSON.parse(response) : [];

        const allAnimalsFormatted: AnimalListProps[] = allAnimals
            .map((pet: AnimalListProps) => {
                return {
                    id: pet.id,
                    weight: pet.weight,
                    breed: pet.breed,
                    name: pet.name,
                    age: pet.age,
                    specie: pet.specie,
                }
            })
        setData(allAnimalsFormatted);
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

    function handleOpenDetails(pet: AnimalListProps) {
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

    function handleLeft(animal: AnimalListProps) {
        const idToDelete = animal.id;
        Alert.alert(
            'Excluir Item',
            'O item selecionado será removido, deseja continuar?',
            [
                { text: "Cancelar", style: 'cancel', onPress: () => { loadAllAnimals() } },

                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        deletar(idToDelete);
                    }
                },
            ]
        );
    }

    async function deletar(idToDelete: string) {
        try {
            const usersJSON = await AsyncStorage.getItem('@petapp:animals');
            const usersArray = JSON.parse(usersJSON!);
            const alteredUsers = usersArray.filter(function (e: AnimalListProps) {
                return e.id !== idToDelete
            })
            AsyncStorage.setItem('@petapp:animals', JSON.stringify(alteredUsers));
            loadAllAnimals();
        }
        catch (error) {
            console.log(error)
        }
    };

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
                                    <IconStyle name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <Body>
                            {
                                data.length > 0 ?
                                    <AnimalsList
                                        data={data}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) =>
                                            <Swipeable
                                                renderLeftActions={LeftAction}
                                                onSwipeableLeftOpen={() => handleLeft(item)}
                                            >
                                                <AnimalCard
                                                    data={item}
                                                    onPress={() => handleOpenDetails(item)}
                                                />
                                            </Swipeable>
                                        }
                                    />
                                    :
                                    <EmptyListText>Ainda não existem animais cadastrados.</EmptyListText>
                            }

                            <Footer>
                                <ButtonComponent
                                    title="Cadastrar Pet"
                                    onPress={() => navigator.navigate('NovoAnimal' as never)}
                                />
                            </Footer>
                        </Body>
                    </>
            }
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
