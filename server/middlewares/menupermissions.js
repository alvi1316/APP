import MenuDAO from "../dao/MenuDAO.js"
import { response, ResponseTypes } from "../utils/response.js"


export let verifyMenuPermissions = async (req, res, next) => {
    
    let menuDAO = new MenuDAO()
    let menu = await menuDAO.getByName('Menu')?.[0]

    if(menu == null) {
        response(res, ResponseTypes.BAD_REQUEST, "BAD REQUEST", {})
        return
    }

    if(req.method == 'POST') {
        if(req.JWTPermission.find(e => e.mid == menu.id)?.create != 1) {
            response(res, ResponseTypes.UNAUTHORISED, "UNAUTHORISED", {})
            return
        }
    }

    if(req.method == 'GET') {
        if(req.JWTPermission.find(e => e.mid == menu.id)?.read != 1) {
            response(res, ResponseTypes.UNAUTHORISED, "UNAUTHORISED", {})
            return
        }
    }

    if(req.method == 'PUT') {
        if(req.JWTPermission.find(e => e.mid == menu.id)?.update != 1) {
            response(res, ResponseTypes.UNAUTHORISED, "UNAUTHORISED", {})
            return
        }
    }

    if(req.method == 'DELETE') {
        if(req.JWTPermission.find(e => e.mid == menu.id)?.delete != 1) {
            response(res, ResponseTypes.UNAUTHORISED, "UNAUTHORISED", {})
            return
        }
    }

    next()
}