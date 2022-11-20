import React from "react";
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from "react-native";
import VacinaSVG from '../../assets/vacina-card-icon.svg';
import ComprimidoSVG from '../../assets/comprimido-card-icon.svg';
import { View, Text } from "react-native";


import {
    Container,
    Title,
    IconImg,
    Resumo,
    Linha,
    IconTitle
} from './styles';


export interface VaccineCardProps {
    name: string;
    category: 'Medicamento' | 'Vacina';
    date: string;
}

interface Props extends TouchableOpacityProps {
    data: VaccineCardProps;
}

export function VaccineCard({ data, ...rest }: Props) {


    return (
        <Container {...rest}>
            <View>

                <Title>
                    {data.name}
                </Title>

                <Linha>
                    <IconTitle>
                        <IconImg>
                            {data.category === 'Medicamento' ?
                                <ComprimidoSVG width={RFValue(25)}
                                    height={RFValue(25)} />
                                :
                                <VacinaSVG width={RFValue(25)}
                                    height={RFValue(25)} />}
                        </IconImg>
                        <Text>{data.category}</Text>
                    </IconTitle>
                    <Text>Data: {data.date}</Text>
                </Linha>

            </View>
        </Container>
    )
}