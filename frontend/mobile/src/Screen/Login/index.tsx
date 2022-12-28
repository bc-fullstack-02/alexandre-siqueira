import React, { useState} from "react";
import api from "../../services/api";
import { Auth, AuthForm } from "../../components/AuthForm";

export function Login(){

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
        <AuthForm 
            formTitle="Faça login e comece a usar!"
            submitFormButtonText="Entrar"
            submitFormButtonAction={handleLogin}
            linkDescription="Não possui conta? Crie uma agora!"
            routeName=""            
        />
    )
}