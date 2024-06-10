import '../css/MenuBar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMenuContext } from '../providers/MenuProvider'

function MenuBarClosed(prop) {
    return (
        <img onClick={prop.toggleMenu} alt='breadcrumbwhite' src={require('../images/breadcrumbwhite.png')}/>
    )
}

function MenuBarOpen(prop) {
    return (
        <>  
            <div>
                <div className='closemenubutton'>
                    <h2>Menu</h2>
                    <img onClick={prop.toggleMenu} alt='breadcrumbwhite' src={require('../images/leftarrow.png')}/>
                </div>
                {prop?.menuList?.map((e) => <Link key={e.id} to={e.url}><div className='menuitem'>{e.name}</div></Link>)}
                
                {/*
                <Link to="/landing/"><div className='menuitem'>Home</div></Link>
                <Link to="/landing/company/"><div className='menuitem'>Company</div></Link>
                <Link to="/landing/plant/"><div className='menuitem'>Plant</div></Link>
                <Link to="/landing/shift/"><div className='menuitem'>Shift</div></Link>
                <Link to="/landing/employees/"><div className='menuitem'>Employees</div></Link>
                <Link to="/landing/attendance/"><div className='menuitem'>Attendance</div></Link>
                <div className='menuitem'>Material</div>
                <div className='menuitem'>Blue Book</div>
                <div className='menuitem'>Inventory</div>
                <div className='menuitem'>Approval</div>
                <div className='menuitem'>Inspecton Sheet</div>
                <Link to="/landing/Menu/"><div className='menuitem'>Menu</div></Link>
                */}
            </div>
            <div>
                <div className='menuitem'>Settings</div>
            </div>
        </>
    )
}

function MenuBar() {

    let toggleMenu = e => {
        setExtend(prev => !prev)
    }

    let [menus, ] = useMenuContext()
    let [extend, setExtend] = useState(false)
    
    return (
        <div className={extend?"menubar extended":"menubar"}>
            {
                extend
                ?<MenuBarOpen toggleMenu={toggleMenu} menuList={menus}/>
                :<MenuBarClosed toggleMenu={toggleMenu}/>
            }
        </div>
    )
}

export default MenuBar