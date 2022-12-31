import React, { useState } from "react";
import { KeyboardAvoidingView, Image, Platform } from "react-native";
import { User, Lock } from "phosphor-react-native";

import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Spacer } from "../../components/Spacer";
import { Button } from "../../components/Button";

import logo from "../../../assets/images/logo.png";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Auth } from "../../@types/auth";

interface AuthFormProps {
  formTitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void;
}

export function AuthForm({
  formTitle,
  submitFormButtonText,
  submitFormButtonAction,
}: AuthFormProps) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.containerPosition}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <Image source={logo} style={logo} resizeMethod="scale" />
      <Heading title="Sysmap Parrot" subtitle={formTitle} />
        <Input.Root>
          <Input.Icon>
            <User color={THEME.COLORS.INPUT} />
          </Input.Icon>
          <Input.Input
            value={user}
            onChangeText={setUser}
            placeholder="Digite seu usuário..."
            placeholderTextColor={THEME.COLORS.INPUT}
            autoCapitalize="none"
            autoCorrect
          />
        </Input.Root>
      <Spacer />
      <Input.Root>
        <Input.Icon>
          <Lock color={THEME.COLORS.INPUT} />
        </Input.Icon>
        <Input.Input
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha..."
          placeholderTextColor={THEME.COLORS.INPUT}
          autoCapitalize="none"
          autoCorrect
          secureTextEntry
        />
      </Input.Root>
      <Spacer />
      <Button
        onPress={() => submitFormButtonAction({ user, password })}
        title={submitFormButtonText}
      />
      <Spacer />
    </KeyboardAvoidingView>
  );
}
