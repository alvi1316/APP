import '../css/Employes.css'
import { useState, useEffect } from 'react'
import DropdownTextInput from './DropdownTextInput'
import PaginationTable from './PaginationTable'
import { useToastContext } from '../providers/ToastProvider'
import { ToastTypes } from '../utils/ToastTypes'
import Treeview from './Treeview'


function AddEmployee() {
    
    let [extend, setExtend] = useState(false)

    let toggleExtend = e => {
        setExtend(prev => !prev)
    }

    let handleOnSubmit = e => {
        e.preventDefault()
        console.log(e.target.elements)
    }

    let map = [
        {
            id: "1",
            text: "P3",
            children: [
                {
                    id: "2",
                    text: "Office Shift",
                    children: [
                        {
                            id: "6",
                            text: "Plant Manager",
                            children: [
                                {
                                    id: "7",
                                    text: "Operation Manager",
                                    children: [
                                        {id: "9",text: "Quality Engineer"},
                                        {id: "10",text: "Material Manager"}
                                    ]
                                },
                                {
                                    id: "8",
                                    text: "HR",
                                    children: [
                                        {id: "11",text:"Scheduler"},
                                        {id: "12",text:"Supervisor"}
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    id: "3",
                    text: "First Shift"
                },
                {
                    id: "4",
                    text: "Second Shift"
                },
                {
                    id: "5",
                    text: "Third Shift"
                },
            ]
        }
    ]

    return (
        <div className={extend?"addemployee extend" : "addemployee"}>
            <div className='header'>
                <h2>Add Employee</h2>
                <img onClick={toggleExtend} src={require('../images/breadcrumbblack.png')} alt='breadcrumbblack' />
            </div>
            {
                extend?
                <form onSubmit={handleOnSubmit}>
                    <label>Company</label>
                    <select name="company">
                        <option value="">Select</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    <label>Plant</label>
                    <select name="company">
                        <option value="">Select</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                    <label>First Name</label>
                    <input placeholder='First Name' name='firstName' type='text'/>
                    <label>Last Name</label>
                    <input placeholder='Last Name' name='lastName' type='text'/>
                    <label>Address</label>
                    <input placeholder='Address' name='address' type='text'/>
                    <DropdownTextInput labelText="Position Name" dataList={["a", "asd", "assd", "asbbbd"]} name="position"/>
                    <Treeview node={map} headerMsg={"Select Role Level"} selectEnabled={true} inputName={"level"}/>
                    <input type='submit' value="Add"/>
                </form>
                :null
            }
        </div>
    )
}

function Employes() {

    let [tbody, setTbody] = useState([])
    let [thead, setThead] = useState([])
    let [,setToastMsg] = useToastContext()

    useEffect(()=>{
        //Fetch Here
        let temp = []
        for(let i=0; i<26; i++) {
            temp.push([i, i, i, i, i])
        }
        setTbody(temp)

        //Fetch Here
        setThead(["First Name", "Last Name", "Company", "Plant", "Shift"])

    },[])

    
    let onClickRow = (str)=>{
        console.log(str, "click")
    }

    let onDeleteRow = (str)=>{
        setToastMsg({msg:"Successfully Deleted!", type:ToastTypes.SUCCESS})
    }


    return (
        <div className='employes'>
            <AddEmployee/>
            <PaginationTable headerMsg={"Employee List"} thead={thead} tbody={tbody} onClickRow={onClickRow} onDeleteRow={onDeleteRow}/>
        </div>
    )
}

export default Employes