import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    isLoading: null,
    token: null,
    setIsLoading: () => {},
    setUser: () => {},
    setToken: () => {},
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('token'))
    const [isLoading, setIsLoading] = useState(true)
    
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    return (
        <StateContext.Provider value={{
            isLoading,
            user,
            token,
            setIsLoading,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)