import MenuDAO from "../dao/MenuDAO.js"
import PermissionDAO from "../dao/PermissionDAO.js"
import Menu from "../models/Menu.js"
import Permission from "../models/Permission.js"

import { response, ResponseTypes } from "../utils/response.js"

export let deleteMenu = async (req, res) => {
    let menuDAO =  new MenuDAO()
    let result = await  menuDAO.deleteById(req.body.id)

    if(result == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }
    
    response(res, ResponseTypes.OK, "Successful", {})
    return
}

export let add = async (req, res) => {
    let menuDAO =  new MenuDAO()
    let menu = new Menu(req.body).getData()
    let result = await menuDAO.add(menu)
    if(result == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }

    if(result?.[0]?.affectedRows == 0) {
        response(res, ResponseTypes.NOT_FOUND, "Failed", {})
        return
    }

    let rows = await menuDAO.getById([result?.[0]?.insertId])

    response(res, ResponseTypes.OK, "Successful", rows[0])
}

export let update = async (req, res) => {
    let menuDAO =  new MenuDAO()
    let menu = new Menu(req.body).getData()
    let result = await menuDAO.update(menu)
    if(result == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }

    if(result[0].affectedRows == 0) {
        response(res, ResponseTypes.NOT_FOUND, "Failed", {})
        return
    }

    response(res, ResponseTypes.OK, "Successful", {})
}

/**
 * Input: req.query.ids (array || int || null), req.params.ids(int || null),
 * Output: array
 */
export let get = async (req, res) => {

    let ids = req.query.ids
    if(ids == null) { 
        ids = req.params.ids 
    }    
    
    if(!Array.isArray(ids) && ids != null) {
        ids = [ids]  
    }

    let menuDAO =  new MenuDAO()
    let menus = await menuDAO.getById(ids)

    response(res, ResponseTypes.OK, "Successful", menus)
}

export let getMenusWithReadPermissions = async (req, res) => {

    let permissionDAO = new PermissionDAO()
    let permissions = await permissionDAO.getByUid([req.JWTUser.id])
    let menuIds = permissions.filter(e => e.read == 1).map(e => e.mid)
    
    let menuDAO = new MenuDAO()
    let menus = await menuDAO.getById(menuIds)

    response(res, ResponseTypes.OK, "Successful", menus)
}