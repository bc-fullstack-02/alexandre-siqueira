import React, { useContext } from "react";
import { Text, View } from "react-native";
import { UserCircle } from "phosphor-react-native";

import { Context as AuthContext } from "../../context/AuthContext"

import { styles } from "./styles";
import { Button } from "../../components/Button";

export function Profile() {

    const { user, logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <UserCircle color="white" size={48} weight="thin" />
          <Text style={styles.userNameText}>{user}</Text>
        </View>
        <Button title="Sair" onPress={logout}  />      
      </View>
    </View>
  );
}
