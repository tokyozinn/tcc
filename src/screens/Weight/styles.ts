import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from 'react-native';
import { WeightListProps } from ".";

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
    height: 100%;
    flex: 1;
`;


export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(25)}px;
`;



export const Body = styled.View`
    flex: 1;
    width: 100%;
`;

export const VaccineList = styled(
    FlatList as new (props: FlatListProps<WeightListProps>) => FlatList<WeightListProps>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingBottom: 10 },
})``;

export const Footer = styled.View`
    align-items: center;
    width: 100%;
    padding: 24px;
`;

export const EmptyListText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.attention_light};
 `;

