import React, { ReactElement, ReactNode, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

import api from '../services/api'

const defaultValue = {
    token: null,
    user: null,
    profile: null,
    isLoading: true
}

const Context = React.createContext(defaultValue)

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state, action) => {
        //action: { type: string, payload: any}
        switch (action.type) {
            case 'login':
                return {
                    ...state,
                    ...action.payload
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = async ({ user, password }) => {
        try {
            const response = await api.post('/security/login', { user, password })
            const accessToken  = response.data
            const { token } = accessToken
            const { profile, user: userName } = jwtDecode(token)

            dispatch({
                type: 'login',
                payload: { token: accessToken, profile, user: userName },
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Context.Provider
            value={{
                ...state,
                login
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }