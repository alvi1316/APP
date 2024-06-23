import express from "express"
import cors from 'cors'
import authRouter from "./routes/authroute.js"
import menuRouter from "./routes/menuroute.js"
import companyRouter from "./routes/companyroute.js"

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())

app.use(express.json())

app.use('/auth', authRouter)

app.use('/menu', menuRouter)

app.use('/company', companyRouter)

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON http://127.0.0.1:${PORT}`))