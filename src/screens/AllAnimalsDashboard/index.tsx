import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { View, Text, StyleSheet } from 'react-native';
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
    AnimalCards,
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

    function handleOpenDetails(pet: AnimalListProps) {
        const name = pet.name;
        const id = pet.id;
        navigator.navigate('Dashboard' as never, { id, name } as never)
    }

    function LeftAction(){
       
        console.log("oi");
        return(
            <View style={styles.leftAction}>
                 <Icon name="trash-alt" size={25} color="white"/>
            </View>
        )
    }

    function handleLeft(){
        alert('Animal Excluído');
    }

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
                                                onSwipeableLeftOpen={handleLeft}
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
                                {/* <AddPetButton 
                                    title="Cadastrar novo pet"
                                    onPress={() => navigator.navigate('NovoAnimal')} /> */}
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
    }, actionText: {

    }
});
