import '../css/Company.css'
import { useState, useEffect } from 'react'
import PaginationTable from './PaginationTable'

function AddCompany() {

    let [extend, setExtend] = useState(false)

    let toggleExtend = e => {
        setExtend(prev => !prev)
    }

    return (
        <div className={extend?"addcompany extend" : "addcompany"}>
            <div className='header'>
                <h2>Add Company</h2>
                <img onClick={toggleExtend} src={require('../images/breadcrumbblack.png')} alt='breadcrumbblack' />
            </div>
            {
                extend?
                <form>
                    <label>Name</label>
                    <input placeholder='Company Name' name='name' type='text'/>
                    <label>Description</label>
                    <textarea placeholder='Company Description' name='name' type='text'/>
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

    let [tbody, setTbody] = useState([])
    let [thead, setThead] = useState([])

    useEffect(()=>{
        //Fetch Here
        let temp = []
        for(let i=0; i<26; i++) {
            temp.push([String.fromCharCode(97+i), String.fromCharCode(97+i), `${i}`])
        }
        setTbody(temp)

        //Fetch Here
        setThead(["Company", "Description", "Address"])

    },[])




    return (
        <div className="company">
            <AddCompany/>
            <PaginationTable headerMsg={"Company List"} tbody={tbody} thead={thead}/>
        </div>
    )
}

export default Company