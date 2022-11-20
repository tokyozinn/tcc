import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin: 24px 24px 0px 24px;
    padding: 13px;
`;

export const IconImg = styled.View`
    align-items: center;
    margin: auto 0;
    text-align: center;
`;

export const Resumo = styled.View`
    width: 80%;
    padding-left: 25px;
`;

export const Title = styled.Text`
    width: 80%;
    text-align: center;
    margin: auto 0;
    font-size: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;