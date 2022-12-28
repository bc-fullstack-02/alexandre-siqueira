import React from "react";
import { Image, KeyboardAvoidingView, Platform, Text } from "react-native";
import { Heading } from "../Heading";
import { Input } from "../../components/Input";
import { User, Lock } from "phosphor-react-native"

import { styles } from "./styles"
import logo from "../../../assets/images/logo.png"
import { THEME } from "../../theme";
import { Spacer } from "../../components/Spacer";
import { Button } from "../../components/Button";

export function Login(){
    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            contentContainerStyle={styles.containerPosition}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        > 
            <Image source={logo} style={logo} resizeMethod="scale" />
            <Heading title='SysMap Parrot' subtitle='Faça o login e comece a usar!'></Heading>
            <Input.Root>
                <Input.Icon>
                    <User color={THEME.COLORS.INPUT} />
                </Input.Icon>
                <Input.Input 
                    placeholder="Digite seu usuário!"
                    placeholderTextColor={THEME.COLORS.INPUT}
                    autoCapitalize="none"
                    autoCorrect={false}>
                </Input.Input>
            </Input.Root>
            <Spacer />
            <Input.Root>
                <Input.Icon>
                    <Lock color={THEME.COLORS.INPUT} />
                </Input.Icon>
                <Input.Input 
                    placeholder="********"
                    placeholderTextColor={THEME.COLORS.INPUT}
                    autoCapitalize="none"
                    secureTextEntry
                    autoCorrect={false}>
                </Input.Input>
            </Input.Root>
            <Spacer />
            <Button onPress={() => {}} title="Entrar" /> 
            <Spacer />
            <Text style={styles.link}>Não possui conta? Crie aqui!</Text>
        </KeyboardAvoidingView>
    )
}