import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import CaoSVG from '../../assets/cao.svg';
import GatoSVG from '../../assets/gato.svg';

import {
    Container,
    Title,
    IconImg,
} from './styles';

interface AnimalCardProps {
    name: string;
    specie: 'dog' | 'cat';
}



export function AnimalCard({ name, specie }: AnimalCardProps) {

    return (
        <Container>
            <IconImg>
                {specie === 'dog' ?
                    <CaoSVG width={RFValue(200)}
                        height={RFValue(200)} />
                    :
                    <GatoSVG width={RFValue(200)}
                        height={RFValue(200)} />}
            </IconImg>
            <Title>
                {name}
            </Title>
        </Container>
    )
}