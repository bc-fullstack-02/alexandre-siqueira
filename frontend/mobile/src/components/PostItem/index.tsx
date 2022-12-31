import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { UserCircle, Chat, Heart } from "phosphor-react-native";

import { Context as PostContext } from "../../context/PostContext";
import { Context as AuthContext } from "../../context/AuthContext";

import { Post } from "../../@types/post";

import { styles } from "./styles";
import { Spacer } from "../Spacer";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const { likePost, dislikePost } = useContext(PostContext);
  const { profile } = useContext(AuthContext);

  function handleLikePress() {
    if (post.likes.includes(profile)) {
      dislikePost && dislikePost({ postId: post._id });
    } else {
      likePost && likePost({ postId: post._id });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View style={styles.postHeading}>
          <UserCircle color="white" size={48} weight="thin" />
          <Text style={styles.postUserText}>{post.profile.name}</Text>
        </View>
        <Spacer>
          <View style={styles.contentBody}>
            <Text style={styles.contentText}>{post.description}</Text>
          </View>
          {post.image ? (
            <Image
              source={{ uri: `"${post.imageUrl}"` }}
              style={styles.image}
            ></Image>
          ) : (
            <View style={styles.contentBody}>
              <Text style={styles.contentText}>{post.imageUrl}</Text>
            </View>
          )}
        </Spacer>
        <View style={styles.footer}>
          <Chat size={24} color="white" weight="thin" />
          <Text style={styles.number}>{post.comments.length}</Text>
          <TouchableOpacity onPress={handleLikePress}>
            {post.likes.includes(profile) ? (
              <Heart size={24} color="red" weight="fill" />
            ) : (
              <Heart size={24} color="white" weight="thin" />
            )}
          </TouchableOpacity>
          <Text style={styles.number}>{post.likes.length}</Text>
        </View>
      </View>
    </View>
  );
}
