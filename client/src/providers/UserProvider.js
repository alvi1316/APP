import React, { useState, useContext } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

    let localAuthData = JSON.parse(localStorage.getItem("authData"))
    
    let [authData, setAuthData] = useState(localAuthData)

    return (
        <UserContext.Provider value={[authData, setAuthData]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () =>  useContext(UserContext)