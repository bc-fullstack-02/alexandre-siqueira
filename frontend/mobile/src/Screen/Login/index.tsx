import React from "react";
import { Text, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import api from "../../services/api";
import { Auth, AuthForm } from "../../components/AuthForm";
import { styles } from "./styles";

interface LoginProps{
  navigation: NativeStackNavigationProp<any, any>
}

export function Login({ navigation }: LoginProps){

  function handleRegisterClick(){
    navigation.navigate("SingUp");
  }

    async function handleLogin(auth: Auth) {

      try {
        const response = await api.post("/security/login", auth);
        console.log(response)
      } catch (err) {
        console.error(err);
        alert("Usuário ou Senha: Inválidos!");
      }
    }

    return (
      <>
        <AuthForm
          formTitle="Faça login e comece a usar!"
          submitFormButtonText="Entrar"
          submitFormButtonAction={handleLogin}
        />
        <TouchableOpacity onPress={handleRegisterClick}>
          <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
        </TouchableOpacity>
      </>
    );
}