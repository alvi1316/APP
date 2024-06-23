import '../css/Company.css'
import { useState, useEffect, useCallback } from 'react'
import PaginationTable from './PaginationTable'
import { SERVER_URL } from '../utils/Constants'
import { useUserContext } from '../providers/UserProvider'

function AddCompany() {

    let [extend, setExtend] = useState(false)
    let [authData, ] = useUserContext()

    let toggleExtend = e => {
        setExtend(prev => !prev)
    }

    let handleOnSubmit = e => {
        e.preventDefault()
        let name = e.target.children.name.value
        let description = e.target.children.description.value
        let address = e.target.children.address.value

        fetch(SERVER_URL+'/company',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${authData?.token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                address: address
            })
        })
        .then(res => {
            if(res.status !== 200) {
                throw new Error()
            }
            //Todo show toast or something
        })
        .catch(e => {})
    }
    
    return (
        <div className={extend?"addcompany extend" : "addcompany"}>
            <div className='header'>
                <h2>Add Company</h2>
                <img onClick={toggleExtend} src={require('../images/breadcrumbblack.png')} alt='breadcrumbblack' />
            </div>
            {
                extend?
                <form onSubmit={handleOnSubmit}>
                    <label>Name</label>
                    <input placeholder='Company Name' name='name' type='text'/>
                    <label>Description</label>
                    <textarea placeholder='Company Description' name='description' type='text'/>
                    <label>Address</label>
                    <input placeholder='Company Address' name='address' type='text'/>
                    <input type='submit' value="Add"/>
                </form>
                :null
            }
        </div>
    )
}


function Company() {

    let [authData, ] = useUserContext()
    
    let thead = ["Company", "Description", "Address"]
    let [tbody, setTbody] = useState([])

    let fetchCompanies = useCallback(() => {
        fetch(SERVER_URL+'/company',{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${authData?.token}`
            }
        })
        .then(res => {
            if(res.status !== 200) {
                throw new Error()
            }
            return res.json()
        })
        .then(data => setTbody(data.data))
        .catch(e => {})
    },[authData?.token])

    useEffect(()=>{
        fetchCompanies()
    },[fetchCompanies])




    return (
        <div className="company">
            <AddCompany/>
            <PaginationTable
                headline={"Company List"} 
                tbody={tbody} 
                thead={thead}
                canEdit={true}
                canDelete={true}
            />
        </div>
    )
}

export default Company