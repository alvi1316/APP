import React, { useState, useContext } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

    let localUser= localStorage.getItem("user")
    
    let [user, setUser] = useState(localUser)

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () =>  useContext(UserContext)
