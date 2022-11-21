import React from "react";
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from "react-native";
import BalancaSVG from '../../assets/balanca-card-icon.svg';
import { View, Text } from "react-native";


import {
    Container,
    Title,
    IconImg,
    Resumo,
    Linha,
    IconTitle
} from './styles';


export interface WeightCardProps {
    weight: string;
    date: string;
}

interface Props extends TouchableOpacityProps {
    data: WeightCardProps;
}

export function WeightCard({ data, ...rest }: Props) {


    return (
        <Container {...rest}>
            <View>
                <Linha>
                    <IconTitle>
                        <IconImg>
                                <BalancaSVG width={RFValue(25)}
                                    height={RFValue(25)} />
                               
                        </IconImg>
                        <Text>{data.weight}</Text>
                    </IconTitle>
                    <Text>Data: {data.date}</Text>
                </Linha>

            </View>
        </Container>
    )
}