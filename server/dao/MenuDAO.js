import execute from "../utils/db.js"
import Menu from "../models/Menu.js"

class MenuDAO {

    /**
     * Input: int
     * Output: result || null 
     */
    async deleteById (id) {
        return await execute("UPDATE menu SET isDeleted = 1 WHERE id=?", [id])
    }

    /**
     * Input: Menu
     * Output: result || null
     */
    async add (menu) {
        return await execute("INSERT INTO menu(name, url, params) VALUES(?, ?, ?)", [menu?.name, menu?.url, menu?.params])
    }

    /**
     * Input: Menu
     * Output: result || null 
     */
    async update (menu) {
        return await execute("UPDATE menu SET name=?, url=?, params=? WHERE id=? AND isDeleted = 0", [menu?.name, menu?.url, menu?.params, menu?.id])
    }

    
    /**
     *  Input: array || null 
     *  Output: array of menus
     */
    async getById (ids) {

        let result = null

        if(ids == null) {
            result = await execute("SELECT * FROM menu WHERE isDeleted = 0")
        } else {
            result = await execute(`SELECT * FROM menu WHERE id IN (${ids.map(e => "?").join(',')}) AND isdeleted = 0`, ids)
        }

        if(result == null) return []
        let rows = []
        for(let row of result[0]) {
            rows.push(new Menu(row).getData())
        }

        return rows
        
    }

    /**
     *  Input: name as string 
     *  Output: array of menus
     */
    async getByName (name) {

        let result = null

        result = await execute("SELECT * FROM menu WHERE name = ? AND isdeleted = 0", [name])

        if(result == null) return []
        let rows = []
        for(let row of result[0]) {
            rows.push(new Menu(row).getData())
        }

        return rows
    }

}

export default MenuDAO