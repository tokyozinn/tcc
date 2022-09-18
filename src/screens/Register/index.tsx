import React, { useState } from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypeButtons,
} from "./styles";

export function Register() {
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />
                    <TransactionTypeButtons>
                        <TransactionTypeButton
                            title="Income"
                            type="up"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton
                            title="Income"
                            type="down"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypeButtons>

                </Fields>



                <Button title="Enviar" />
            </Form>

        </Container>

    );
}