import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import CaoSVG from '../../assets/cao.svg';
import { TouchableOpacityProps } from "react-native";
import GatoSVG from '../../assets/gato.svg';

import {
    Container,
    Title,
    IconImg,
} from './styles';

export interface AnimalCardProps {
    name: string;
    specie: 'Cachorro' | 'Gato';
}

interface Props extends TouchableOpacityProps {
    data: AnimalCardProps;
}

export function AnimalCard({ data, ...rest }: Props) {

    return (
        <Container {...rest}>
            <IconImg>
                {data.specie === 'Cachorro' ?
                    <CaoSVG width={RFValue(50)}
                        height={RFValue(50)} />
                    :
                    <GatoSVG width={RFValue(50)}
                        height={RFValue(50)} />}
            </IconImg>
            <Title>
                {data.name}
            </Title>
        </Container>
    )
}