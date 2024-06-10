import UserDAO from "../dao/UserDao.js"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { response, ResponseTypes } from "../utils/response.js"

config()

let createJWT = data => {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '2d' })
}

export let login = async (req, res) => {
    let userDAO =  new UserDAO()
    let user  = await userDAO.getUserByEmailAndPassword(req.body.email, req.body.password)
    
    if(user != null) {
        delete user["password"]
        delete user["isdeleted"]
        
        let token = createJWT(user)
        response(res, ResponseTypes.OK, "Login Successful", { token: token, user: user })
    } else {
        response(res, ResponseTypes.UNAUTHORISED, "Login Failed", {})
    }
    
}