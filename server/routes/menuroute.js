import { Router } from "express";
import { update, get, add, deleteMenu } from "../controllers/menucontroller.js";

let menuRouter = Router()

menuRouter.get('/:ids?', get)

menuRouter.put('/', update)

menuRouter.post('/', add)

menuRouter.delete('/', deleteMenu)

export default menuRouter