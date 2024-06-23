import execute from "../utils/db.js"
import Menu from "../models/Company.js"

class CompanyDAO {

    /**
     * Input: int
     * Output: result || null 
     */
    async deleteById (id) {
        return await execute("UPDATE company SET isDeleted = 1 WHERE id=?", [id])
    }

    /**
     * Input: Company
     * Output: result || null
     */
    async add (company) {
        return await execute("INSERT INTO company(name, description, address) VALUES(?, ?, ?)", [company?.name, company?.description, company?.address])
    }

    /**
     * Input: Company
     * Output: result || null 
     */
    async update (company) {
        return await execute("UPDATE company SET name=?, description=?, address=? WHERE id=? AND isDeleted = 0", [company?.name, company?.description, company?.address, company?.id])
    }

    
    /**
     *  Input: array || null 
     *  Output: array
     */
    async getById (ids) {

        let result = null

        if(ids == null) {
            result = await execute("SELECT * FROM company WHERE isDeleted = 0")
        } else {
            result = await execute(`SELECT * FROM company WHERE id IN (${ids.map(e => "?").join(',')}) AND isdeleted = 0`, ids)
        }

        if(result == null) return []
        let rows = []
        for(let row of result[0]) {
            rows.push(new Menu(row).getData())
        }

        return rows
        
    }

}

export default CompanyDAO