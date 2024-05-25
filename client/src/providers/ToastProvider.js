import React, { useState, useContext } from 'react'
import { ToastTypes } from '../utils/ToastTypes'

const ToastContext = React.createContext()

export const ToastProvider = ({ children }) => {
    
    let [toastMsg, setToastMsg] = useState({msg: "", type: ToastTypes.ERROR})

    return (
        <ToastContext.Provider value={[toastMsg, setToastMsg]}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToastContext = () =>  useContext(ToastContext)