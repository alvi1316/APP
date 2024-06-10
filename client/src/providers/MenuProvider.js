import { createContext, useState, useContext, useEffect } from 'react'
import { SERVER_URL } from '../utils/Constants'
import { useUserContext } from './UserProvider'

const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
    
    let [menus, setMenus] = useState([])
    let [authData, ] = useUserContext()

    let fetchMenus = (token) => {
        fetch(SERVER_URL + "/menu/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then(res => {
            if(res.status !== 200) {
                throw new Error();
            }
            return res.json()
        })
        .then(data => {
            setMenus(data.data)
        })
        .catch(e => {})
    }

    useEffect(() => {
        if(authData != null) {
            fetchMenus(authData?.token)
        }
    },[authData])

    return (
        <MenuContext.Provider value={[menus, setMenus]}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuContext = () =>  useContext(MenuContext)