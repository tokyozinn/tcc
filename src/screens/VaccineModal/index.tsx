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

import { ButtonComponent } from "../../components/Form/Button";
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
    category: 'Medicamento' | 'Vacina';
    date: string;
}

type NavigationProps = {
    navigate: (screen: string) => void;
}

const schema = Yup.object().shape({
    medicamento: Yup.string()
        .required('Campo obrigatório'),
});

import { MedicamentosCategorySelect } from "../MedicamentosCategorySelect";

export function VaccineModal() {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
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
        }

        const allAnimalsCollection = `@petapp:animals`;

        try {
            const generalAnimalRecordData = await AsyncStorage.getItem(allAnimalsCollection);
            const currentData = generalAnimalRecordData ? JSON.parse(generalAnimalRecordData) : [];

            const appendedData = [
                ...currentData,
                newAnimal
            ]
            
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
                        Cadastrar Medicamento
                    </Title>
                </Header>

                <Form>
                    <Fields>
                        <CategorySelectButton 
                            title={category.name}
                            onPress={handleOpenSelectCategory}
                        />

                        <InputForm
                            name="medicamento"
                            control={control}
                            placeholder="Nome do Medicamento"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.medicamento?.message}
                        />
                     
                    </Fields>

                    <ButtonComponent
                        title="Enviar"
                        onPress={handleSubmit(handleVaccineRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <MedicamentosCategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}