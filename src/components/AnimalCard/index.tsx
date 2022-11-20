import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import CaoSVG from '../../assets/cao.svg';
import { TouchableOpacityProps } from "react-native";
import GatoSVG from '../../assets/gato.svg';
import { View, Text } from "react-native";

import {
    Container,
    Title,
    IconImg,
    Resumo
} from './styles';

export interface AnimalCardProps {
    name: string;
    specie: 'Cachorro' | 'Gato';
    weight: number;
    breed: string,
    age: number;
}

interface Props extends TouchableOpacityProps {
    data: AnimalCardProps;
}

export function AnimalCard({ data, ...rest }: Props) {

    return (
        <Container {...rest}>
            <IconImg>
                {data.specie === 'Cachorro' ?
                    <CaoSVG width={RFValue(80)}
                        height={RFValue(80)} />
                    :
                    <GatoSVG width={RFValue(80)}
                        height={RFValue(80)} />}
            </IconImg>
            <Resumo>
                <Title>
                    {data.name}
                </Title>
                <Text>Peso: {data.weight}</Text>
                <Text>Idade: {data.age}</Text>
                <Text>Raça: {data.breed}</Text>
            </Resumo>

        </Container>
    )
}