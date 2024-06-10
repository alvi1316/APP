import React, { useState, useContext, useEffect } from 'react'
import { SERVER_URL } from '../utils/Constants'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

    let localAuthData = JSON.parse(localStorage.getItem("authData"))
    
    let [authData, setAuthData] = useState(localAuthData)

    useEffect(() => {
        fetch(SERVER_URL+"/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `bearer ${authData?.token}`
          }
        })
        .then(res => {
          if(res.status !== 202) {
            throw new Error()
          }
        })
        .catch((e) => {
          localStorage.clear()
          setAuthData(null)
        })
      },[authData?.token])

    return (
        <UserContext.Provider value={[authData, setAuthData]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () =>  useContext(UserContext)