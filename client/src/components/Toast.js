import '../css/Toast.css'
import { useToastContext } from '../providers/ToastProvider'
import { useEffect, useState } from 'react'
import { ToastTypes } from '../utils/ToastTypes'

function Toast() {

    let [toastMsg, setToastMsg] = useToastContext()
    let [toggle, setToggle] = useState(false)

    useEffect(()=>{
        if(toastMsg.msg === "") return
        setToggle(true)
        let timer = setTimeout(() => {
            setToggle(false)
            setToastMsg({msg:"", type:toastMsg.type})
        }, 5 * 1000);
        return () => {
            clearTimeout(timer);
        };
    },[toastMsg, setToastMsg])


    let toastClass = () => {
        let cls = "toast " + toastMsg.type.toLowerCase()
        if(toggle) {cls += " extend"}
        return cls
    }

    return (
        <div className={toastClass()}>
            {
                toggle
                ?
                <div className='body'>
                    <div className='msgwrapper'>
                        {toastMsg.type===ToastTypes.INFO?<p className='icon'>🛈</p>:null}
                        {toastMsg.type===ToastTypes.ERROR?<p className='icon'>🛇</p>:null}
                        {toastMsg.type===ToastTypes.SUCCESS?<p className='icon'>🗸</p>:null}
                        <p className='msg'>{toastMsg.msg}</p>
                    </div>
                    <div className='cross' onClick={()=>setToggle(false)}>✖</div>
                </div>
                :
                null
            }
            
        </div>
    )
}

export default Toast