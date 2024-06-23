import { Router } from "express";
import { update, get, add, deleteMenu, getMenusWithReadPermissions } from "../controllers/menucontroller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { verifyMenuPermissions } from "../middlewares/menupermissions.js";

let menuRouter = Router()

menuRouter.use(verifyJWT)

menuRouter.get('/getMenusWithReadPermissions', getMenusWithReadPermissions)

menuRouter.use(verifyMenuPermissions)

menuRouter.get('/:ids?', get)

menuRouter.put('/', update)

menuRouter.post('/', add)

menuRouter.delete('/', deleteMenu)

export default menuRouter