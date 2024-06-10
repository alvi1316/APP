import mysql from 'mysql2/promise'
import { config } from 'dotenv'

config()

let execute = async (query, params) => {

    let result;

    try {

        let connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        })
    
        result = await connection.execute(query, params)
        await connection.end()

    } catch (e) {
        console.log(e)
    }

    return result

}  

export default execute