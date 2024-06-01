import execute from "../utils/db.js"
import User from "../models/User.js"

class UserDAO {

    async getUserByEmailAndPassword (email, password) {
        let result = await execute("select * from users where email = ? and password = ?", [email, password])
        if(result == null) return null 
        let [row,] = result
        let user = new User(row[0]).getData()
        if(user.id == null) return null
        return user
    }

}

export default UserDAO