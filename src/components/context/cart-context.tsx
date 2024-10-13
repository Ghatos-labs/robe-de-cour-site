import { createContext } from 'react'

type ContextProviderProps = {
    children: React.ReactNode;
}

const cartList:object[] = [];

export const Context = createContext(cartList);

export const ContextProvider = ({children}: ContextProviderProps) => {
    return <Context.Provider value={cartList}>{children}</Context.Provider>
}