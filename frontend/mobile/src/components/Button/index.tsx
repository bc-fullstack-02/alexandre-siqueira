import React from "react";
import { View, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles"

interface ButtonProps extends TouchableOpacityProps{
    title: String
}

export function Button(props: ButtonProps){
    return (
        <View style={styles.container} {...props}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}