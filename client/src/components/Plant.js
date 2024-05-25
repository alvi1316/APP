import '../css/Plant.css'
import { useState, useEffect, createRef } from 'react'

function AddPlant() {

    let [extend, setExtend] = useState(false)

    let toggleExtend = e => {
        setExtend(prev => !prev)
    }

    return (
        <div className={extend?"addplant extend" : "addplant"}>
            <div className='header'>
                <h2>Add Plant</h2>
                <img onClick={toggleExtend} src={require('../images/breadcrumbblack.png')} alt='breadcrumbblack' />
            </div>
            {
                extend?
                <form>
                    <label>Company</label>
                    <select name="Company">
                        <option value="">Select</option>
                        <option value="volvo">Volvo</option>
                        <option value="audi">Audi</option>
                    </select>
                    <label>Name</label>
                    <input placeholder='Plant Name' name='name' type='text'/>
                    <label>Description</label>
                    <textarea placeholder='Plant Description' name='name' type='text'/>
                    <label>Address</label>
                    <input placeholder='Plant Address' name='address' type='text'/>
                    <input type='submit' value="Add"/>
                </form>
                :null
            }
        </div>
    )
}

function PlantList() {

    let [data, setData] = useState([])

    let [pageCount, setPageCount] = useState(1)

    let [pageData, setPageData] = useState([])

    let pageGoToRef = createRef()

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
        for(let i=0; i<26; i++) {
            temp.push({company: String.fromCharCode(97+i), name: String.fromCharCode(97+i), desc: `${i}`, address: String.fromCharCode(97+i)+`${i}`})
        }
        setData(temp)
    },[])

    useEffect(() => {
        let temp = []
        for(let i=(pageCount-1)*10; i<pageCount*10 && i<data.length; i++) {
            temp.push(
                <tr key={i}>
                    <td>{data[i].company}</td>
                    <td>{data[i].name}</td>
                    <td>{data[i].desc}</td>
                    <td>{data[i].address}</td>
                </tr>
            )
        }
        setPageData(temp)
    }, [pageCount, data]);

    return (
        <div className="plantlist">
            <div className='header'>
                <h3>Plant List</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Company</td>
                        <td>Plant</td>
                        <td>Description</td>
                        <td>Address</td>
                    </tr>
                </thead>
                <tbody>
                    {pageData}
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

function Plant() {
    return (
        <div className="plant">
            <AddPlant/>
            <PlantList/>
        </div>
    )
}

export default Plant