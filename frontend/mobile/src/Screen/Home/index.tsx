import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircle, PencilSimple } from "phosphor-react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";

import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { PostItem } from "../../components/PostItem";

interface HomeProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export function Home({ navigation }) {
  const { user } = useContext(AuthContext);
  const { getPosts, posts } = useContext(PostContext);

  useEffect(() => {
    getPosts && getPosts();
  }, []);

  function handlePencilPress() {
    navigation.navigate("CreatePost");
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={THEME.COLORS.BACKGROUND_800}
      />
      <View style={styles.heading}>
        <UserCircle color="white" size={48} weight="thin" />
        <Text style={styles.userNameText}>{user}</Text>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity onPress={handlePencilPress}>
          <PencilSimple color="white" size={40} weight="thin" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={posts}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => <PostItem post={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
