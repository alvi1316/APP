import { Router } from "express";
import { login } from "../controllers/authcontroller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { response, ResponseTypes } from "../utils/response.js";

let authRouter = Router()

authRouter.post('/login', login)

authRouter.post('/verify', verifyJWT, (req, res) => {
    response(res, ResponseTypes.ACCEPTED, "Verification Successful", {})
})
export default authRouter