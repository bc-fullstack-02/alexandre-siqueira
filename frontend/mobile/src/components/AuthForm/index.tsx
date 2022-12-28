import { User, Lock } from "phosphor-react-native";
import { KeyboardAvoidingView, Platform, Text, Image } from "react-native";
import { Heading } from "../../Screen/Heading";
import { THEME } from "../../theme";
import { Button } from "../Button";
import { Input } from "../Input";
import { Spacer } from "../Spacer";
import { styles } from "./styles"
import logo from "../../../assets/images/logo.png"
import { useState } from "react";

export interface Auth {
    user: string;
    name?: string;
    password: string;
  }

interface AuthFormProps{
  formTitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void;
  showNameInput?: boolean;
}

export function AuthForm({ formTitle, submitFormButtonText, submitFormButtonAction } : AuthFormProps){

    const [ user, setUser] = useState("")
    const [ password, setPassword] = useState("")

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            contentContainerStyle={styles.containerPosition}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        > 
            <Image source={logo} style={logo} resizeMethod="scale" />
            <Heading title='SysMap Parrot' subtitle={formTitle}></Heading>
            <Input.Root>
                <Input.Icon>
                    <User color={THEME.COLORS.INPUT} />
                </Input.Icon>
                <Input.Input 
                    value={user}
                    onChangeText ={setUser}
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
                    value={password}
                    onChangeText ={setPassword}
                    placeholder="********"
                    placeholderTextColor={THEME.COLORS.INPUT}
                    autoCapitalize="none"
                    secureTextEntry
                    autoCorrect={false}>
                </Input.Input>
            </Input.Root>
            <Spacer />
            <Button onPress={() => submitFormButtonAction({user, password})} title={submitFormButtonText} /> 
            <Spacer />
        </KeyboardAvoidingView>
    )
}