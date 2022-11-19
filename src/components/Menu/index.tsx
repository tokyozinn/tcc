import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider, Menu } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { View } from "react-native";

const MenuComponent = () => {
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);
    const onIconPress = () => {
        openMenu();
    }

    return (
        <View>
            <Icon
                name="ellipsis-v"
                size={24}
                color="white"
                onPress={onIconPress}
            />

            <Provider>
                <Menu
                    visible={showMenu}
                    onDismiss={closeMenu}
                    anchor={{ x: 0, y: 0 }}
                >
                    <Menu.Item onPress={() => { }} title="View" />
                    <Menu.Item onPress={() => { }} title="Edit" />
                    <Menu.Item onPress={() => { }} title="Delete" />
                </Menu>
            </Provider>
        </View>
    )
};

export default MenuComponent;