import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
    height: 100%;
`;

export const UpperView = styled.View`
    width: 100%;
    height: ${RFPercentage(70)}px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #6C63FF;
`;

export const LowerView = styled.View`
    width: 100%;
    height: ${RFPercentage(40)}px;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    background-color: #DB7FB3; 
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px ;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
     
`;


export const Photo = styled.Image`
    width: ${RFValue(227)}px;
    height: ${RFValue(211)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;


export const LogoutButton = styled.TouchableOpacity``;


export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;

`;

export const Transactions = styled.View`
    flex: 1%;
    padding: 0 24px;

    margin-top: ${RFPercentage(12)}px;
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
 `;
