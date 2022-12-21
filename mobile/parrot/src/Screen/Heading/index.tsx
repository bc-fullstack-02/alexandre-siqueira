import React from "react";
import { Text, View, ViewProps } from "react-native";

import { styles } from "./styles"

interface HeadingProps extends ViewProps {
    title: string;
    subtitle: string;

}

export function Heading({title, subtitle, ...res}: HeadingProps){
    return (
        <View style={styles.container} {... res}> 
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}