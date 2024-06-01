import { useUserContext } from "../providers/UserProvider"

function Landing() {

    let [authData,] = useUserContext()
    return (
        <div>
            {authData?.user?.email}
        </div>
    )
}

export default Landing