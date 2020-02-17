import React, { createContext, useReducer, useContext } from "react"

import { ActionType, StateType } from './appReducer'

const Context = createContext({})


type AppStateProviderProps = {
    reducer: any,
    initialState: Object,
    children: React.ReactNode
}

export function AppStateProvider({ reducer, initialState = {}, children }: AppStateProviderProps) {
    const value = useReducer(reducer, initialState);
    console.log(value)
    return <Context.Provider value={value} children={children} />
}

export function useAppState() {
    return useContext(Context);
}