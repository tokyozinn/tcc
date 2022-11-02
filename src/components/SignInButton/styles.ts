import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled.TouchableOpacity`
    
    width: 70%;

    flex-direction: row;
    align-items: center;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    justify-content: space-between;
    margin-top: -20px;

    padding: 10px;
    background-color: ${({theme }) => theme.colors.background};
`;

export const ImageContainer = styled.View`
    border-color: ${({ theme }) => theme.colors.text};
    border-right-width: 1px;
    padding: 10px 25px 10px 15px;
   
`;

export const Text = styled.Text`
    padding: 0px 10px;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(11)}px;
    color: ${({ theme }) => theme.colors.text_dark};
`;