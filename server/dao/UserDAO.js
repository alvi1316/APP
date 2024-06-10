import execute from "../utils/db.js"
import User from "../models/User.js"

class UserDAO {

    async getUserByEmailAndPassword (email, password) {
        let result = await execute("SELECT * FROM users WHERE email = ? AND password = ? AND isDeleted = 0", [email, password])
        if(result == null) return null 
        let [row,] = result
        let user = new User(row[0]).getData()
        if(user.id == null) return null
        return user
    }

}

export default UserDAO