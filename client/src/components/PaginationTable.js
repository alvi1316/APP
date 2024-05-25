import '../css/PaginationTable.css'
import { useState, useEffect, createRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

function PaginationTable(props) {

    let [data, setData] = useState([])

    let [pageData, setPageData] = useState([])

    let [pageCount, setPageCount] = useState(1)

    let pageGoToRef = createRef()

    useEffect(()=>{
        if(!Array.isArray(props.tbody) || props.tbody.length === 0) return
        setData(props.tbody)
    },[props.tbody])


    let handleGotoPage = e => {
        e.preventDefault()
        let val = parseInt(pageGoToRef.current.value)
        if(!isNaN(val)) {
            if(val*10<1) {
                pageGoToRef.current.value = 1
                setPageCount(1)
            } else if(val*10>data.length) {
                pageGoToRef.current.value = Math.ceil(data.length/10)
                setPageCount(Math.ceil(data.length/10))
            } else {
                pageGoToRef.current.value = val
                setPageCount(val)
            }
        }
    }

    let upCounter = e => {
        e.preventDefault()
        setPageCount(prev => {
            if((prev)*10 < data.length) {
                prev++
            }
            pageGoToRef.current.value = prev
            return prev
        })
    }

    let downCounter = e => {
        e.preventDefault()
        setPageCount(prev => {
            if(prev>1) {
                prev--
            }
            pageGoToRef.current.value = prev
            return prev
        })
    }

    useEffect(() => {
        let temp = []
        for(let i=(pageCount-1)*10; i<pageCount*10 && i<data.length; i++) {
            temp.push(data[i])
        }
        setPageData(temp)
    }, [pageCount, data]);


    if(!Array.isArray(props.thead) || props.thead.length === 0) return null
    if(!Array.isArray(props.tbody) || props.tbody.length === 0) return null

    return (
        <div className="list">

            <div className='header'>
                <h3>{props.headerMsg}</h3>
            </div>

            <table>
                <thead>
                    <tr>
                        {props.thead.map(e => <td key={uuidv4()}>{e}</td>)}
                        {!props?.onDeleteRow?null:<td key={uuidv4()}>Actions</td>}
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.map(e=> {
                            let cls = "clickable"
                            if(!props?.onClickRow) cls=""
                            return (
                                <tr className={cls} onClick={!props?.onClickRow?undefined:()=>props.onClickRow("WOW")} key={uuidv4()}>
                                    {e.map(el => <td key={uuidv4()}>{el}</td>)}
                                    {
                                        !props?.onDeleteRow
                                        ?null
                                        :<td key={uuidv4()}>
                                            <img 
                                                alt='deletelogo' 
                                                onClick={()=>props.onDeleteRow("DELETE")} 
                                                src={require('../images/deletelogo.png')}
                                            />
                                        </td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>  

            <div className='pagination'>
                <button onClick={downCounter}>{"<"}</button>
                <small>{pageCount} out of {Math.ceil(data.length/10)}</small>
                <button onClick={upCounter}>{">"}</button>
                <small>Go to:</small>
                <input type="number" ref={pageGoToRef}/>
                <button onClick={handleGotoPage}>Go</button>
            </div>  

        </div>
    )
}

export default PaginationTable