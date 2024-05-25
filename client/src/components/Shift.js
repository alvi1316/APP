import '../css/Shift.css'
import { useEffect, useState } from 'react'
import Treeview from './Treeview'
import PaginationTable from './PaginationTable'
import { useToastContext } from '../providers/ToastProvider'
import { ToastTypes } from '../utils/ToastTypes'

function AddShift() {

    let [extend, setExtend] = useState(false)

    let toggleExtend = e => {
        setExtend(prev => !prev)
    }

    return (
        <div className={extend?"addshift extend" : "addshift"}>
            <div className='header'>
                <h2>Add Shift</h2>
                <img onClick={toggleExtend} src={require('../images/breadcrumbblack.png')} alt='breadcrumbblack' />
            </div>
            {
                extend?
                <form>
                    <label>Company</label>
                    <select name="company">
                        <option value="">Select</option>
                        <option value="P1">Audi</option>
                        <option value="P2">NYX</option>
                        <option value="P3">FORD</option>
                    </select>
                    <label>Plant</label>
                    <select name="plant">
                        <option value="">Select</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                    <label>Shift Name</label>
                    <input placeholder='Shift Name' name='name' type='text'/>
                    <input type='submit' value="Add"/>
                </form>
                :null
            }
        </div>
    )
}

function Shift() {

    let [tbody, setTbody] = useState([])
    let [thead, setThead] = useState([])
    let [,setToastMsg] = useToastContext()

    useEffect(()=>{
        //Fetch Here
        let temp = []
        for(let i=0; i<26; i++) {
            temp.push([String.fromCharCode(97+i), String.fromCharCode(97+i), `${i}`])
        }
        setTbody(temp)

        //Fetch Here
        setThead(["Company", "Plant", "Shift"])

    },[])

    let onClickRow = (str)=>{
        console.log(str, "click")
    }

    let onDeleteRow = (str)=>{
        setToastMsg({msg:"Successfully Deleted!", type:ToastTypes.SUCCESS})
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
        <div className="shift">
            <AddShift/>
            <PaginationTable headerMsg={"Shift List"} thead={thead} tbody={tbody} onClickRow={onClickRow} onDeleteRow={onDeleteRow}/>
            <Treeview node={map} headerMsg={"Organogram Hierarchy"}/>
        </div>
    )
}

export default Shift