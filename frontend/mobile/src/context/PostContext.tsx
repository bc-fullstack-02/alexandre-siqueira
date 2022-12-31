import React, { ReactNode, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Action } from "../@types/reducer";
import { navigate } from "../../RootNavigation";
import api from "../services/api";
import { getAuthHeader } from "../services/auth";

const defaultValue = { posts: [], errorMessage: null };

const Context = React.createContext(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: any, action: Action) => {
    switch (action.type) {
      case "create_post":
        return { ...state, posts: [action.payload, ...state.posts] };
      case "show_posts":
        return { ...state, posts: action.payload };
      case "like_post":
        const newPostsLike = state.posts;
        const [postLike, ..._] = newPostsLike.filter(
          (post) => post._id === action.payload.id
        );
        postLike.likes.push(action.payload.profile);
        return { ...state, posts: [...newPostsLike] };
      case "dislike_post":
        const newPostsDislike = state.posts;
        const [postDislike, ...rest] = newPostsDislike.filter(
          (post) => post._id === action.payload.id
        );
        const index = postDislike.likes.indexOf(action.payload.profile);
        postDislike.likes.splice(index, 1);
        return { ...state, posts: [...newPostsDislike] };
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getPosts = async () => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.get("/feed", authHeader);
      dispatch({
        type: "show_posts",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async ({ postId }) => {
    try {
      const authHeader = await getAuthHeader();
      await api.post(`/posts/${postId}/like`, null, authHeader);
      const profile = await SecureStore.getItemAsync("profile");
      dispatch({
        type: "like_post",
        payload: { id: postId, profile: profile },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dislikePost = async ({ postId }) => {
    try {
      const authHeader = await getAuthHeader();
      await api.post(`/posts/${postId}/like`, null, authHeader);
      const profile = await SecureStore.getItemAsync("profile");
      dispatch({
        type: "dislike_post",
        payload: { id: postId, profile: profile },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async ({ title, description }) => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.post(
        "/posts",
        { title, description },
        authHeader
      );
      dispatch({ type: "create_post", payload: response.data });
      navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getPosts,
        createPost,
        likePost,
        dislikePost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
