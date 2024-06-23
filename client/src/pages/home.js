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
import { CLIENT_URL } from '../utils/Constants.js'
import NotFound from '../components/NotFound.js'
import { useMenuContext } from '../providers/MenuProvider.js'

function HomePage () {

    let [menus, ] = useMenuContext()

    let pageMapping = {
        '/' : <Landing/>,
        '/company/': <Company/>,
        '/plant/': <Plant/>,
        '/shift/': <Shift/>,
        '/employees/': <Employes/>,
        '/attendance/': <Attendance/>,
        '/Menu/': <Menu/>,
    }
    
    return (
        <div className='homepage'>
            <NavigationBar/>
            <div className='homebodywrapper'>
                <MenuBar/>
                <Routes>
                    [...{
                            menus.map(e => {
                                let pathRoute = e.url.replace(`${CLIENT_URL}/landing`, "")
                                return <Route key={e.id} path={pathRoute+e.params} element={pageMapping[pathRoute]}/>
                            })
                        },
                        <Route path="*" element={<NotFound/>}/>
                    ]
                </Routes>
            </div>
        </div>
    )
}

export default HomePage