import { Router } from "express";
import { update, get, add, deleteMenu } from "../controllers/menucontroller.js";
import { verifyJWT } from "../middlewares/auth.js";

let menuRouter = Router()

menuRouter.get('/:ids?', verifyJWT, get)

menuRouter.put('/', verifyJWT, update)

menuRouter.post('/', verifyJWT, add)

menuRouter.delete('/', verifyJWT, deleteMenu)

export default menuRouter