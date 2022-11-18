import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin: 24px 24px 0px 24px;
    padding: 13px;
`;

export const IconImg = styled.View`
    flex: 1;
    align-items: center;
    margin: auto 0;
    text-align: center;
`;

export const Title = styled.Text`
    width: 80%;
    text-align: center;
    margin: auto 0;
    font-size: ${RFValue(36)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;