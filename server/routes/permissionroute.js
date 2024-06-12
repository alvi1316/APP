import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { getByUid } from "../controllers/permissioncontroller.js"

let permissionRouter = Router()

permissionRouter.get('/', verifyJWT, getByUid)
export default permissionRouter