import { useEffect, useState } from 'react'
import '../css/Attendance.css'

function FilterTable() {

    let [tHead, setTHead] = useState([])
    let [tBody, setTBody] = useState([])

    useEffect(()=>{
        //Fetch
        setTHead(["First Name", "Last Name", "Attendance", "Hours", "Add"])

        setTBody([
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },
            {
                fName: "Potato",
                lName: "Tomato",
                attendance: false,
                hours: 8,
                readOnly: true
            },       
        ])

    },[])

    let handleAttandanceChange = (i, attendance) => {
        setTBody(prev => {
            prev = [...prev]
            prev[i].attendance = attendance
            return prev
        })
    }

    let handleHoursChange = (i, hours) => {
        setTBody(prev => {
            prev = [...prev]
            prev[i].hours = Math.abs(hours)
            return prev
        })
    }

    let handleAddRow = (i) => {
        setTBody(prev => {
            prev = [...prev]
            let obj = {
                fName: "",
                lName: "",
                attendance: false,
                hours: 0,
                readOnly: false
            }
            prev.splice(i+1, 0, obj);
            return prev
        })
    }

    let handleFName = (i, fName) => {
        setTBody(prev => {
            prev = [...prev]
            prev[i].fName = fName
            return prev
        })
    }

    let handleLName = (i, lName) => {
        setTBody(prev => {
            prev = [...prev]
            prev[i].lName = lName
            return prev
        })
    }

    return (
        <div className="filtertable">
            <div className='header'>
                <h2>Attendance</h2>
            </div>
            <form>
                <div className='flexrow'>

                    <div className='flexcol'>
                        <label>Company</label>
                        <select name="company">
                            <option value="">Select</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>

                    <div className='flexcol'>
                        <label>Plant</label>
                        <select name="plant">
                            <option value="">Select</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                    </div>

                </div>

                <div className='flexrow'>

                    <div className='flexcol'>
                        <label>Shift</label>
                        <select name="shift">
                            <option value="">Select</option>
                            <option value="First Shift">P1</option>
                            <option value="Second Shift">P2</option>
                            <option value="Third Shift">P2</option>
                        </select>
                    </div>

                    <div className='flexcol'>
                        <label>Date</label>
                        <input type="date" name="date"/>
                    </div>            

                </div>

                <table>
                    <thead>
                        <tr>
                            {tHead.map((e,i) => <td key={i}>{e}</td>)}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tBody.map((e,i) => {
                                return (
                                    <tr key={i}>
                                        {
                                            e.readOnly?
                                            <>
                                                <td>{e.fName}</td>
                                                <td>{e.lName}</td>
                                            </>:
                                            <>
                                                <td><input type='text' onChange={(e)=>handleFName(i, e.target.val)}/></td>
                                                <td><input type='text' onChange={(e)=>handleLName(i, e.target.val)}/></td>
                                            </>
                                        }
                                        <td>
                                            <label>
                                                <input type="radio" onChange={() => handleAttandanceChange(i, true)} checked={e.attendance}/>
                                                Present
                                            </label>
                                            <label>
                                                <input type="radio" onChange={() => handleAttandanceChange(i, false)} checked={!e.attendance}/>
                                                Absent
                                            </label>
                                        </td>
                                        <td>
                                            <input value={e.hours} type='number' min='0' step='0.01' onChange={(e)=>handleHoursChange(i, e.target.value)} />
                                        </td>
                                        <td className='cpointer' onClick={()=>handleAddRow(i)}>➕</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                </table>

                <input type='submit' value="Update"/>
            </form>
        </div>
    )
}


function Attendance() {
    return (
        <div className="attendance">
            <FilterTable/>
        </div>
    )
}

export default Attendance