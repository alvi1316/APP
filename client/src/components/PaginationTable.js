import '../css/PaginationTable.css'
import { useState, useEffect, createRef } from 'react'

function PaginationTableRow(props) {

    let [editMode, setEditMode] = useState(false)
    let [editData, setEditData] = useState(props.data)

    let handleOnChange = (val, key, isText) => {
        setEditData(prev => {
            prev = structuredClone(prev)
            if(isText === true) {
                prev[key].text = val
                return prev
            }
            prev[key] = val
            return prev
        })
    }

    if(props.data == null) return null
    return (
        <tr>
        {   
            editMode ?
            <>
                {
                    Object.keys(editData)
                    .filter(e => e !== 'id' && e !== 'onSave' && e !== 'onDelete')
                    .map((e, i) => {
                        if(typeof editData[e] === 'string') {
                            return <td><input key={i} value={editData[e]} onChange={ele => handleOnChange(ele.target.value, e, false)}/></td>
                        } 
                        return <td><input key={i} value={editData[e].text} onChange={ele => handleOnChange(ele.target.value, e, true)}/></td>
                    })
                }
                {
                    <td>
                        <img 
                            alt='savelogo'
                            src={require('../images/editlogo.png')}
                            onClick={() => props.data.onSave()}
                        />
                        <img 
                            alt='cancellogo'
                            src={require('../images/cancellogo.png')}
                            onClick={() => {
                                setEditData(props.data)
                                setEditMode(prev => !prev)
                            }}
                        />
                </td>
                }
            </>
            :
            <>
                {
                    Object.keys(props.data)
                    .filter(e => e !== 'id' && e !== 'onSave' && e !== 'onDelete')
                    .map((e, i) => {
                        if(typeof props.data[e] === 'string') {
                            return <td key={i}>{props.data[e]}</td>
                        }
                        return <td key={i} onClick={props.data[e].onClick}>{props.data[e].text}</td>
                    })
                }
                {
                    props.canEdit || props.canDelete ?
                    <td>
                        {
                            props.canEdit ?
                                <img 
                                    alt='editlogo'
                                    src={require('../images/editlogo.png')}
                                    onClick={() => setEditMode(prev => !prev)}
                                />
                            : null
                        }
                        {
                            props.canDelete ?
                                <img 
                                    alt='deletelogo'
                                    src={require('../images/deletelogo.png')}
                                />
                            : null
                        }
                    </td>
                    :null
                }
            </>
        }
        </tr>
    )
}

//headline
//thead
//tbody
//canDelete
//canEdit
//canFilter
//filterOptions

function PaginationTable(props) {

    let [currentPageData, setCurrentPageData] = useState([])

    let [pageCount, setPageCount] = useState(1)

    let pageGoToRef = createRef()

    useEffect(() => {
        if(Array.isArray(props.tbody)) {
            let currentData = []
            for(let i=(pageCount-1)*10; i<pageCount*10 && i<props.tbody.length; i++) {
                currentData.push(props.tbody[i])
            }
            setCurrentPageData(currentData)
        }
    }, [pageCount, props.tbody]);

    let handleGotoPage = e => {
        let val = parseInt(pageGoToRef.current.value)
        if(!isNaN(val)) {
            if(val*10<1) {
                pageGoToRef.current.value = 1
                setPageCount(1)
            } else if(val*10>props.tbody.length) {
                pageGoToRef.current.value = Math.ceil(props.tbody.length/10)
                setPageCount(Math.ceil(props.tbody.length/10))
            } else {
                pageGoToRef.current.value = val
                setPageCount(val)
            }
        }
    }

    let upCounter = e => {
        setPageCount(prev => {
            if((prev)*10 < props.tbody.length) {
                prev++
            }
            pageGoToRef.current.value = prev
            return prev
        })
    }

    let downCounter = e => {
        setPageCount(prev => {
            if(prev>1) {
                prev--
            }
            pageGoToRef.current.value = prev
            return prev
        })
    }

    if(!Array.isArray(props.thead) || props.thead.length === 0) return null
    if(!Array.isArray(props.tbody) || props.tbody.length === 0) return null

    return (
        <div className="list">

            <div className='headline'>
                <h3>{props.headline}</h3>
                {
                    props.canfilter ?
                    <div>
                    <input type='text' placeholder='Filter'/>
                    <select>
                        <option value={""}>Filter Options</option>
                        {props.filterOptions.map(e => <option value={e}>Filter by {e}</option>)}
                    </select>
                    </div>
                    :
                    null
                }
            </div>

            <table>
                <thead>
                    <tr>
                        {props.thead.map((e,i) => <td key={i}>{e}</td>)}
                        {props.canDelete || props.canEdit ? <td>Actions</td> : null}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((e, i) => <PaginationTableRow key={i} data={e} canEdit={props.canEdit} canDelete={props.canDelete}/>)}
                </tbody>
            </table>  

            <div className='pagination'>
                <button onClick={downCounter}>{"<"}</button>
                <small>{pageCount} out of {Math.ceil(props.tbody.length/10)}</small>
                <button onClick={upCounter}>{">"}</button>
                <small>Go to:</small>
                <input type="number" ref={pageGoToRef}/>
                <button onClick={handleGotoPage}>Go</button>
            </div>  

        </div>
    )
}

export default PaginationTable