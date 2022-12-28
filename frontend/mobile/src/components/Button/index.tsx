import React from "react";
import { View, TouchableOpacityProps, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"

interface ButtonProps extends TouchableOpacityProps{
    title: String
}

export function Button(props: ButtonProps){
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}