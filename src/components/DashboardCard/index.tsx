import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from "react-native";
import BalancaSVG from '../../assets/balanca-icon.svg';
import VacinaSVG from '../../assets/vacina-icon.svg';

import {
    Container,
    Title,
    IconImg,
} from './styles';


interface Props extends TouchableOpacityProps {
    title: string;
    icon: 'Vacina' | 'Balanca';
}

export function DashboardCard({ ...rest }: Props) {

    return (
        <Container {...rest}>
            <IconImg>
                {rest.icon === 'Vacina' ?
                    <VacinaSVG width={RFValue(50)}
                        height={RFValue(50)} />
                    :
                    <BalancaSVG width={RFValue(50)}
                        height={RFValue(50)} />}
            </IconImg>
            <Title>
                {rest.title}
            </Title>
        </Container>
    )
}