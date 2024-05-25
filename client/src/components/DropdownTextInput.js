import '../css/DropdownTextInput.css'
import { v4 as uuidv4 } from 'uuid';

function DropdownTextInput(props) {

    let dataListId = uuidv4()

    return (
        <div className='dropdowntextinput'>
            <label>{props.labelText}</label>
            <input type='text' placeholder={props.labelText} list={dataListId} name={props.name}/>
            <datalist id={dataListId}>
                {props.dataList.map(e => <option key={uuidv4()} value={e}>{e}</option>)}
            </datalist>          
        </div>  
    )
}

export default DropdownTextInput