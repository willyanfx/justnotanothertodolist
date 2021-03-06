import React, { createContext, useReducer, useContext } from 'react';
const Context = createContext<any>(null);

type AppStateProviderProps = {
    reducer: any;
    initialState: object;
    children: React.ReactNode;
};

export function AppStateProvider({
    reducer,
    initialState = {},
    children
}: AppStateProviderProps) {
    const value = useReducer(reducer, initialState);
    return <Context.Provider value={value} children={children} />;
}

export function useAppState() {
    return useContext(Context);
}
