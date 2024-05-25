import { useUserContext } from "../providers/UserProvider"

function Landing() {

    let [user,] = useUserContext()

    return (
        <div>
            {user}
        </div>
    )
}

export default Landing