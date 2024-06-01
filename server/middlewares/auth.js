import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { response, ResponseTypes } from "../utils/response.js"

config()

export let verifyJWT = (req, res, next) => {

    let headerAuthorization = req.headers['authorization']

    if(headerAuthorization == null) {
        response(res, ResponseTypes.UNAUTHORISED, "UNAUTHORISED", {})
        return
    } 
    
    let token = headerAuthorization.split(' ')?.[1]
    if (token == null) {
        response(res, ResponseTypes.BAD_REQUEST, "BAD_REQUEST", {})
        return
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) {
            response(res, ResponseTypes.BAD_REQUEST, "BAD_REQUEST", {})
            return
        }
        next()
    })
}