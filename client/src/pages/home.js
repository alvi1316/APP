import '../css/HomePage.css'
import NavigationBar from '../components/NavigationBar.js'
import MenuBar from '../components/MenuBar.js'
import { Route, Routes } from 'react-router-dom'
import Company from '../components/Company.js'
import Plant from '../components/Plant.js'
import Landing from '../components/Landing.js'
import Shift from '../components/Shift.js'
import Employes from '../components/Employes.js'
import Attendance from '../components/Attendance.js'
import Menu from '../components/Menu.js'

function HomePage () {
    
    return (
        <div className='homepage'>
            <NavigationBar/>
            <div className='homebodywrapper'>
                <MenuBar/>
                <Routes>
                    <Route path='/' element={<Landing/>}/>
                    <Route path='/company' element={<Company/>}/>
                    <Route path='/plant/:id?' element={<Plant/>}/>
                    <Route path='/shift/:id?' element={<Shift/>}/>
                    <Route path='/employees/:id?' element={<Employes/>}/>
                    <Route path='/attendance' element={<Attendance/>}/>
                    <Route path='/Menu' element={<Menu/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default HomePage