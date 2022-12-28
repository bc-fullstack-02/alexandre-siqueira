import React from "react";
import { Image, View } from "react-native";
import { Heading } from "../Heading";
import { Input } from "../../components/Input";
import { User } from "phosphor-react-native"

import { styles } from "./styles"
import logo from "../../../assets/images/logo.png"
import { THEME } from "../../theme";

export function Login(){
    return (
        <View style={styles.container}> 
            <Image source={logo} style={logo} resizeMethod="scale" />
            <Heading title='SysMap Parrot' subtitle='Faça o login e comece a usar!'></Heading>
            <Input.Root>
                <Input.Icon>
                    <User color={THEME.COLORS.INPUT} />
                </Input.Icon>
                <Input.Input></Input.Input>
            </Input.Root>
        </View>
    )
}