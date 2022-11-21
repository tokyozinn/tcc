import React, { useState } from "react";
import {
    Keyboard,
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
import { InputForm } from "../../components/Form/InputForm";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
} from "./styles";

interface FormData {
    weight: string;
    date: string;
}

type NavigationProps = {
    navigate: (screen: string) => void;
}

type RouteParams = {
    id: string;
}

const schema = Yup.object().shape({
    weight: Yup.number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório'),
});

export function WeightModal() {
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
        const newWeight = {
            id: String(uuid.v4()),
            weight: form.weight,
            date: new Date()
        }

        const allWeightCollection = `@petapp:weight-${id}`;

        try {
            const allWeightStored = await AsyncStorage.getItem(allWeightCollection);
            const currentData = allWeightStored ? JSON.parse(allWeightStored) : [];

            const appendedData = [
                ...currentData,
                newWeight
            ]

            await AsyncStorage.setItem(allWeightCollection, JSON.stringify(appendedData));
            reset();
            setCategory({
                key: 'category',
                name: 'Categoria'
            });
            navigation.navigate('Dashboard' as never, { id } as never);
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
                        Cadastrar Peso
                    </Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="weight"
                            control={control}
                            placeholder="Peso"
                            keyboardType="number-pad"
                            error={errors.weight?.message}
                        />

                    </Fields>
                    <ButtonComponent
                        title="Enviar"
                        onPress={handleSubmit(handleVaccineRegister)}
                    />
                </Form>
            </Container>
        </TouchableWithoutFeedback>
    );
}