import { UserCircle } from "phosphor-react-native";
import React, { useState, useContext } from "react";
import { View, Text } from "react-native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Spacer } from "../../components/Spacer";

import { styles } from "./sytles";
import { THEME } from "../../theme";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const { user } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <UserCircle color="white" size={48} weight="thin" />
        <Text style={styles.userNameText}>{user}</Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <Spacer>
        <Input.Root>
          <Input.Input
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título do post"
            placeholderTextColor={THEME.COLORS.INPUT}
            autoCapitalize="none"
            autoCorrect
          />
        </Input.Root>
        <Spacer />
        <Input.Root>
          <Input.Input
            value={description}
            onChangeText={setdescription}
            placeholder="Digite a descrição do post"
            placeholderTextColor={THEME.COLORS.INPUT}
            autoCapitalize="none"
            autoCorrect
          />
        </Input.Root>
        <Spacer />
        <Button
          title="Postar"
          onPress={() => {
            createPost && createPost({ title, description });
          }}
        />
      </Spacer>
    </View>
  );
}
