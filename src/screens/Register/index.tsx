import React, { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";


import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypeButtons,
} from "./styles";
import { CategorySelect } from "../CategorySelect";

export function Register() {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'category',
    });

    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategory(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategory(){
        setCategoryModalOpen(false);
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

                    <CategorySelectButton 
                        title= "Categoria"
                        onPress={handleOpenSelectCategory}
                    />

                </Fields>



                <Button title="Enviar" />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory= {handleCloseSelectCategory}
                />
            </Modal>

        </Container>

    );
}