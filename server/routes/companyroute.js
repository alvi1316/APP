import { Router } from "express";
import { update, get, add, deleteCompany } from "../controllers/companycontroller.js";
import { verifyJWT } from "../middlewares/auth.js";

let companyRouter = Router()

companyRouter.use(verifyJWT)

companyRouter.get('/:ids?', get)

companyRouter.put('/', update)

companyRouter.post('/', add)

companyRouter.delete('/', deleteCompany)

export default companyRouter