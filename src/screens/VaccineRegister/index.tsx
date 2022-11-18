import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert,
    View
} from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
} from "./styles";

interface FormData {
    name: string;
    age: number;
    weight: number;
    specie: 'Gato' | 'Cachorro';
}

type NavigationProps = {
    navigate: (screen: string) => void;
}

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Nome é obrigatório'),
    age: Yup.number().integer("Idade deve ser um número inteiro")
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório'),
    breed: Yup.string()
        .required('Raça é obrigatório'),
    weight: Yup.number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório'),
});

import { VaccineCategorySelect } from "../VaccineCategorySelect";

export function VaccineRegister() {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Espécies',
    });

    const navigation = useNavigation<NavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false);
    }

    

    async function handleVaccineRegister(form: Partial<FormData>) {
        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');
        const newAnimal = {
            id: String(uuid.v4()),
            name: form.name,
            age: form.age,
            specie: category.key,
            weight: form.weight,
        }



        const allAnimalsCollection = `@petapp:animals`;

        console.log(newAnimal);

        try {
            const generalAnimalRecordData = await AsyncStorage.getItem(allAnimalsCollection);
            const currentData = generalAnimalRecordData ? JSON.parse(generalAnimalRecordData) : [];

            const appendedData = [
                ...currentData,
                newAnimal
            ]
            // if(generalAnimalRecordData) throw new Error(`Animal com nome "${newAnimal.name}" já existe. Por favor, cadastre com um nome diferente`);
            
            await AsyncStorage.setItem(allAnimalsCollection, JSON.stringify(appendedData));

            reset();
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar.");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>
                        Cadastrar Pet
                    </Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.name?.message}
                        />
                        <InputForm
                            name="age"
                            control={control}
                            placeholder="Idade"
                            keyboardType="number-pad"
                            error={errors.age?.message}
                        />

                        <CategorySelectButton 
                            title={category.name}
                            onPress={handleOpenSelectCategory}
                        />

                        <InputForm
                            name="breed"
                            control={control}
                            placeholder="Raça"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.breed?.message}
                        />
                        <InputForm
                            name="weight"
                            control={control}
                            placeholder="Peso"
                            keyboardType="number-pad"
                            error={errors.weight?.message}
                        />
                    </Fields>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleVaccineRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <VaccineCategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}