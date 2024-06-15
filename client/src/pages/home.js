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
import { useUserContext } from '../providers/UserProvider.js'
import { useEffect, useState } from 'react'
import { SERVER_URL, CLIENT_URL } from '../utils/Constants.js'
import NotFound from '../components/NotFound.js'

function HomePage () {

    let [authData, ] = useUserContext()
    let permissionIdParams = (authData?.permission ?? []).filter(e => e.read === 1).map(e => e.id).join('&ids=')
    let [pages, setPages] = useState([])

    let pageMapping = {
        '/' : <Landing/>,
        '/company/': <Company/>,
        '/plant/': <Plant/>,
        '/shift/': <Shift/>,
        '/employees/': <Employes/>,
        '/attendance/': <Attendance/>,
        '/Menu/': <Menu/>,
    }

    useEffect(() => {
        fetch(SERVER_URL+`/menu/?ids=${permissionIdParams}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${authData?.token}`
            }
        })
        .then(res => {
            if(res.status !== 200) {
                throw new Error()
            }
            return res.json()
        })
        .then(data => {
            setPages(Array.isArray(data?.data) ? data.data : [])
        })
        .catch(e => {})
    }, [authData?.token, permissionIdParams])
    
    return (
        <div className='homepage'>
            <NavigationBar/>
            <div className='homebodywrapper'>
                <MenuBar/>
                <Routes>
                    [...{
                            pages.map(e => {
                                let pathRoute = e.url.replace(`${CLIENT_URL}/landing`, "")+e.params
                                return <Route key={e.id} path={pathRoute} element={pageMapping[pathRoute]}/>
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