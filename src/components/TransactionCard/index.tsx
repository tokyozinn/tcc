import React from 'react';
import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

export function TransactionCard() {
    return (
        <Container>
            <Title>Testando</Title>

            <Amount>R$ 12.000,00</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Investimento em NFT</CategoryName>
                </Category>
                <Date>11/09/2022</Date>
            </Footer>

        </Container>
    )
}