import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin: 24px 24px 0px 24px;
    padding: 13px;
`;

export const Linha = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const IconImg = styled.View`
    align-items: center;
    margin: auto 0;
    padding-right: 10px;
    text-align: center;
`;

export const IconTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Resumo = styled.View`
    padding-left: 25px;
`;


export const Title = styled.Text`
    text-align: left;
    font-size: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;