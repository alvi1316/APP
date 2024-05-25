import '../css/NavigationBar.css'
import { useUserContext } from '../providers/UserProvider'

function NavigationBar() {

    let [, setUser] = useUserContext()
    
    let handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        setUser(null)
    }

    return (
        <div className="navigationbar">
            <div className='brand'>
                <img src={require('../images/navbarlogo.png')} alt='logo' />
                <h3>Company Name</h3>
            </div>
            
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default NavigationBar