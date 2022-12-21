import React from "react";
import { View } from "react-native";
import { Heading } from "../Heading";

import { styles } from "./styles"

export function Login(){
    return (
        <View style={styles.container}> 
            <Heading title='SysMap Parrot' subtitle='Faça o login e comece a usar!'></Heading>
        </View>
    )
}