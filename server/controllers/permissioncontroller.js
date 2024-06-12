import PermissionDAO from "../dao/PermissionDAO.js"
import User from "../models/User.js"
import { response, ResponseTypes } from "../utils/response.js"

export let getByUidAndMid = async (req, res) => {

    if(req.body.uid == null || req.body.mid == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }

    let permissionDAO =  new PermissionDAO()
    let permissions = await permissionDAO.getByUidAndMid(req.body.uid, req.body.mid)
    response(res, ResponseTypes.OK, "Successful", permissions)
}

export let getByUid = async (req, res) => {

    let user = new User(req.JWTUser)

    if(user.id == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }

    let permissionDAO =  new PermissionDAO()
    let permissions = await permissionDAO.getByUid(user.id)
    response(res, ResponseTypes.OK, "Successful", permissions)
}