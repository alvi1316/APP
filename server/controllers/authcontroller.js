import UserDAO from "../dao/UserDao.js"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { response, ResponseTypes } from "../utils/response.js"
import PermissionDAO from "../dao/PermissionDAO.js"
import TokenDAO from "../dao/TokenDAO.js"
import Token from "../models/Token.js"

config()

let createJWT = data => {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '2d' })
}

export let login = async (req, res) => {
    let userDAO =  new UserDAO()
    let user  = await userDAO.getUserByEmailAndPassword(req.body.email, req.body.password)
    
    if(user != null) {

        let permissionDAO = new PermissionDAO()
        let permissions = permissionDAO.getByUid([user.id])

        delete user["password"]
        delete user["isdeleted"]
        
        let token = createJWT({
            user: user,
            permission: permissions
        })

        let tokenDAO = new TokenDAO()
        let tokenObj = new Token({uid: user.id, token: token}).getData()
        let result = tokenDAO.add(tokenObj)
        
        if(result == null || result?.[0]?.affectedRows == 0) {
            response(res, ResponseTypes.UNAUTHORISED, "Login Failed", {})
            return
        }

        response(res, ResponseTypes.OK, "Login Successful", { token: token, user: user, permission: permissions })

    } else {
        response(res, ResponseTypes.UNAUTHORISED, "Login Failed", {})
    }
    
}