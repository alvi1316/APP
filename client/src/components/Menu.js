import '../css/Menu.css'
import { useState, useRef } from 'react'
import { SERVER_URL } from '../utils/Constants.js'
import { useMenuContext } from '../providers/MenuProvider.js'
import { useUserContext } from '../providers/UserProvider.js'

function TableRow (prop) {

    let [edit, setEdit] = useState(false)
    let [editData, setEditData] = useState(prop?.data)
    let [, setMenus] = useMenuContext()
    let [authData, ] = useUserContext()

    let editNameRef = useRef()
    let editUrlRef = useRef()
    let editParamsRef = useRef()

    let fetchMenus = () => {
        fetch(SERVER_URL + "/menu/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${authData?.token}`
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

    let handleNameChange = (name) => {
        setEditData(prev => {
            prev = structuredClone(prev)
            prev.name = name
            return prev
        })
    }

    let handleUrlChange = (url) => {
        setEditData(prev => {
            prev = structuredClone(prev)
            prev.url = url
            return prev
        })
    }

    let handleParamsChange = (params) => {
        setEditData(prev => {
            prev = structuredClone(prev)
            prev.params = params
            return prev
        })
    }

    let handleOnCancle = () => {
        setEditData(prop?.data)
        setEdit(prev => !prev)
    }

    let handleOnSave = () => {
        let name = editNameRef.current.value
        let url = editUrlRef.current.value
        let params = editParamsRef.current.value
        fetch(SERVER_URL+"/menu/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${authData?.token}`
            },
            body: JSON.stringify({
                id: prop?.data?.id,
                name: name,
                url: url,
                params: params
            })
        })
        .then(res => {
            if(res.status !== 200) {
              throw new Error()
            }
            fetchMenus()
            setEdit(prev => !prev)
        })
        .catch((e) => {})
    }

    let handleOnDelete = id => {
        fetch(SERVER_URL+"/menu/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${authData?.token}`
            },
            body: JSON.stringify({id: id})
        })
        .then(res => {
            if(res.status !== 200) {
              throw new Error()
            }
            fetchMenus()
        })
        .catch(e => {})
    }

    return (
        <>
            {
                edit ?
                <tr>
                    <td><input ref={editNameRef} onChange={e => handleNameChange(e.target.value)} value={editData?.name} name='name'/></td>
                    <td><input ref={editUrlRef} onChange={e => handleUrlChange(e.target.value)} value={editData?.url} name='url'/></td>
                    <td><input ref={editParamsRef} onChange={e => handleParamsChange(e.target.value)} value={editData?.params} name='params'/></td>
                    <td>
                        <img
                            onClick={handleOnSave}
                            alt='savelogo'
                            src={require('../images/savelogo.png')}
                        />
                        <img
                            onClick={handleOnCancle}
                            alt='savelogo'
                            src={require('../images/cancellogo.png')}
                        />
                    </td>
                </tr>
                :
                <tr>
                    <td>{prop?.data?.name}</td>
                    <td>{prop?.data?.url}</td>
                    <td>{prop?.data?.params}</td>
                    <td>
                        <img
                            onClick={() => handleOnDelete(prop?.data?.id)}
                            alt='deletelogo'
                            src={require('../images/deletelogo.png')}
                        />
                        <img
                            onClick={() => setEdit(prev => !prev)}
                            alt='editlogo'
                            src={require('../images/editlogo.png')}
                        />
                    </td>
                </tr>
            }
        </>
    )
}

function Menu() {

    let tHead = ["Menu Name", "Menu Url", "Params", "Action"]
    let [menus, setMenus] = useMenuContext()
    let [authData, ] = useUserContext()

    let handleOnSubmit = e => {
        e.preventDefault()
        let name = e.target.children.name.value
        let url = e.target.children.url.value
        let params = e.target.children.params.value
        fetch(SERVER_URL+'/menu/',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${authData?.token}`
            },
            body: JSON.stringify({
                name: name,
                url: url,
                params: params
            })
        })
        .then(res => {
            if(res.status !== 200) {
                throw new Error()
            }
            return res.json()
        })
        .then(data => {
            setMenus(prev => {
                prev = [...prev]
                prev.push(data.data)
                return prev
            })
        })
        .catch(e => {})
    }

    return (
        <div className='menu'>
            <div className="addmenu">
                <div className='header'>
                    <h2>Add Menu</h2>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <label>Menu Name</label>
                    <input placeholder='Menu Name' name='name' type='text'/>
                    <label>Menu Url</label>
                    <input placeholder='Menu Url' name='url' type='text'/>
                    <label>Menu Params</label>
                    <input placeholder='Menu Params' name='params' type='text'/>
                    <input type='submit' value="Add"/>
                </form>
            </div>

            <div className="menulist">
                <div className='header'>
                    <h2>Menu List</h2>
                </div>

                <table>
                    <thead>
                        <tr>
                            {tHead.map((e, i) => <td key={i}><b>{e}</b></td>)}
                        </tr>
                    </thead>

                    <tbody>
                        {menus.map((e, i) => <TableRow key={i} data={e}/>)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Menu