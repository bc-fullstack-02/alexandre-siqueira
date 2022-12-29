import React, { ReactElement, ReactNode, useReducer } from "react";
import jwtDecode from "jwt-decode";

import api from "../services/api";

interface IAuthContext{
  token: string | null,
  user: string | null,
  profile: string | null,
  isLoading: boolean,
  errorMessage: string | null,
  login?: () => void,
  register?: () => void,
}

const defaultValue = {
  token: null,
  user: null,
  profile: null,
  isLoading: true,
  errorMessage: null,
};

const Context = React.createContext<IAuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state, action) => {
    //action: { type: string, payload: any}
    switch (action.type) {
      case "login":
        return {
          ...state,
          ...action.payload,
          errorMessage: null, 
        };
      case "register":
        return { 
          ...state,
          errorMessage: null,
         };
      case "add_error":
        return { ...state, errorMessage: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = async ({ user, password }) => {
    try {
      const response = await api.post("/security/login", { user, password });
      const accessToken = response.data;
      const { token } = accessToken;
      const { profile, user: userName } = jwtDecode(token);

      dispatch({
        type: "login",
        payload: { token: accessToken, profile, user: userName },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "add_error",
        payload: "Ocorreu um erro ao fazer login!"
      })
    }
  };

  const register = async ({ user, password }) => {
    try {
      await api.post("/security/register", { user, password });

      dispatch({
        type: "user_created",
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "add_error",
        payload: "Ocorreu um erro ao cadastrar o usuário!"
      })
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        login,
        register,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
