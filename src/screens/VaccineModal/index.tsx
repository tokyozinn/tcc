import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'

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
    nome: string;
    category: 'Medicamento' | 'Vacina';
    date: string;
}

type NavigationProps = {
    navigate: (screen: string) => void;
}

type RouteParams = {
    id: string;
}

const schema = Yup.object().shape({
    nome: Yup.string()
        .required('Campo obrigatório'),
});

import { MedicamentosCategorySelect } from "../MedicamentosCategorySelect";

export function VaccineModal() {
    const route = useRoute();
    const { id } = route.params as RouteParams;
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
        const newProcedure = {
            id: String(uuid.v4()),
            category: category.name,
            name: form.nome,
            date: new Date()
        }

        const allVaccinesCollection = `@petapp:vaccines-${id}`;

        try {
            const allVacinesStored = await AsyncStorage.getItem(allVaccinesCollection);
            const currentData = allVacinesStored ? JSON.parse(allVacinesStored) : [];

            const appendedData = [
                ...currentData,
                newProcedure
            ]

            await AsyncStorage.setItem(allVaccinesCollection, JSON.stringify(appendedData));
            reset();
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            navigation.navigate('Dashboard', { id } as never);
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
                            name="nome"
                            control={control}
                            placeholder="Nome do Medicamento"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.nome?.message}
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