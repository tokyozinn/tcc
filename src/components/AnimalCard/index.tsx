import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import CaoSVG from '../../assets/cao.svg';
import GatoSVG from '../../assets/gato.svg';

import {
    Container,
    Title,
    IconImg,
} from './styles';

export interface AnimalCardProps {
    name: string;
    specie: 'dog' | 'cat';
}

interface Props {
    data: AnimalCardProps;
}



export function AnimalCard({ data }: Props) {

    return (
        <Container>
            <IconImg>
                {data.specie === 'dog' ?
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