import express, { request } from "express"
import authRouter from "./routes/authroute.js"
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())

app.use(express.json())

app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON http://127.0.0.1:${PORT}`))