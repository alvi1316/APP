import CompanyDAO from "../dao/CompanyDAO.js"
import Company from "../models/Company.js"

import { response, ResponseTypes } from "../utils/response.js"

export let deleteCompany = async (req, res) => {
    let companyDAO =  new CompanyDAO()
    let result = await  companyDAO.deleteById(req.body.id)

    if(result == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }
    
    response(res, ResponseTypes.OK, "Successful", {})
    return
}

export let add = async (req, res) => {
    let companyDAO =  new CompanyDAO()
    let company = new Company(req.body).getData()
    let result = await companyDAO.add(company)
    if(result == null) {
        response(res, ResponseTypes.BAD_REQUEST, "Failed", {})
        return
    }

    if(result?.[0]?.affectedRows == 0) {
        response(res, ResponseTypes.NOT_FOUND, "Failed", {})
        return
    }

    let rows = await companyDAO.getById([result?.[0]?.insertId])

    response(res, ResponseTypes.OK, "Successful", rows[0])
}

export let update = async (req, res) => {
    let companyDAO =  new CompanyDAO()
    let company = new Company(req.body).getData()
    let result = await companyDAO.update(company)
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

    let companyDAO =  new CompanyDAO()
    let company= await companyDAO.getById(ids)

    response(res, ResponseTypes.OK, "Successful", company)
}