import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { getByUid } from "../controllers/permissioncontroller.js"

let permissionRouter = Router()

permissionRouter.use(verifyJWT)

permissionRouter.get('/', getByUid)

export default permissionRouter