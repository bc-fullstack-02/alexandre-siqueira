import React from "react";
import { Text, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import api from "../../services/api";
import { Auth, AuthForm } from "../../components/AuthForm";
import { styles } from "./styles";

interface SingUpProps{
  navigation: NativeStackNavigationProp<any, any>
}


export function SingUp({ navigation }: SingUpProps){

  function handleLoginClick(){
    navigation.navigate("Login");
  }

    async function handleSingUp(auth: Auth) {

      try {
        const response = await api.post("/security/register", auth);
        console.log(response)
      } catch (err) {
        console.error(err);
        alert("Usuário ou Senha: Inválidos!");
      }
    }

    return (
      <>
      <AuthForm 
            formTitle="Faça o cadastro e comece a usar!"
            submitFormButtonText="Cadastrar"
            submitFormButtonAction={handleSingUp}          
        />
        <TouchableOpacity onPress={handleLoginClick}>
          <Text style={styles.link}>Já possui conta? Entre agora!</Text>
        </TouchableOpacity>
    </>
    )
}