import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Context as AuthContext } from "../../context/AuthContext";
import { AuthForm } from "../../components/AuthForm";
import { styles } from "./styles";

interface LoginProps{
  navigation: NativeStackNavigationProp<any, any>
}

export function Login({ navigation }: LoginProps){

  const { login } = useContext(AuthContext)

  function handleRegisterClick(){
    navigation.navigate("SingUp");
  }

    return (
      <>
        <AuthForm
          formTitle="Faça login e comece a usar!"
          submitFormButtonText="Entrar"
          submitFormButtonAction={login}
        />
        <TouchableOpacity onPress={handleRegisterClick}>
          <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
        </TouchableOpacity>
      </>
    );
}