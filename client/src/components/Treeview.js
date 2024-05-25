import { useState } from 'react';
import '../css/Treeview.css'

function Node(prop) {

    let [drop, setDrop] = useState(false)

    let hasChildren = Array.isArray(prop?.node?.children)

    let handleClick = (value) => {
        try {prop.setSelect(value)} catch {}
        if(!hasChildren) return
        setDrop(prev => !prev)
    }

    if(!prop?.node?.text) return null

    return (
        <li>
            <small onClick={() => handleClick(prop?.node?.text)}>{!hasChildren?"▷":drop?"▼":"▶"} {prop?.node?.text}</small>
            {drop&&hasChildren?<DrawNode node={prop?.node?.children} setSelect={prop?.setSelect}/>:null}   
        </li>
    )
    
}

function DrawNode(prop) {

    if(!Array.isArray(prop?.node)) return null

    return (
        <ul>{prop.node.map((e, i) => <Node key={i} node={e} setSelect={prop?.setSelect}/>)}</ul>
    )

}

/*
    Option One:
        node -> Root Node (Array)
        headerMsg -> To display the type of infromation (String)
    Option two:
        node -> Root Node (Array)
        headerMsg -> To display the type of infromation (String)
        selectEnabled -> If true user can select levels (boolean)
        inputName -> Input name to get value inside a form (String)
*/

function Treeview(prop) {

    let [select, setSelect] = useState("") 

    if(!prop?.headerMsg || prop.headerMsg === "") return null
    if(!prop?.node) return null

    return(
        <div className='treeview'>
            <div className='header'>
                <h3>{prop.headerMsg}</h3>
                {
                    prop?.selectEnabled === true?
                    <b>
                        <small>Selected Level: {select}</small>
                        <input type='hidden' name={prop?.inputName} value={select}/>
                    </b>
                    :null
                }
            </div>
            <DrawNode node={prop.node} setSelect={prop?.selectEnabled===true?setSelect:undefined}/>
        </div>
    )
}

export default Treeview