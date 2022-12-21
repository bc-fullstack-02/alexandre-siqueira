import React from "react";
import { Image, View } from "react-native";
import { Heading } from "../Heading";

import { styles } from "./styles"
import { logo } from "../../../assets/images/logo.png"

export function Login(){
    return (
        <View style={styles.container}> 
            <Image source={logo} style={logo} resizeMethod="scale" />
            <Heading title='SysMap Parrot' subtitle='Faça o login e comece a usar!'></Heading>
        </View>
    )
}