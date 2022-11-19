import React from "react";
import { FlatList } from "react-native";
import { species } from "../../utils/species";

import { ButtonComponent } from "../../components/Form/Button";

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles';

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function VaccineCategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props) {
    function handlerCategorySelect(category : Category){
        setCategory(category);
    }
    return (
        <Container>
            <Header>
                <Title>
                    Selecionar Espécie
                </Title>
            </Header>

            <FlatList
                data={species}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category 
                     onPress= {() => handlerCategorySelect(item)}
                     isActive= {category.key === item.key}
                     >
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <ButtonComponent
                    title="Selecionar"
                    onPress={closeSelectCategory} />
            </Footer>

        </Container>
    )
}