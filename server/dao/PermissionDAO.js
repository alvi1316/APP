import execute from "../utils/db.js"
import Permission from "../models/Permission.js"


class PermissionDAO {

    /**
     *  Input: int, int 
     *  Output: array
     */
    async getByUidAndMid (uid, mid) {

        let result = null

        if(mid == null || uid == null) return []

        result = await execute(`SELECT * FROM permission WHERE uid = ? AND mid = ? AND isdeleted = 0`, uid, mid)

        if(result == null) return []
        
        let rows = []
        for(let row of result[0]) {
            rows.push(new Permission(row).getData())
        }

        return rows
        
    }

    /**
     *  Input: array 
     *  Output: array
     */
    async getByUid (uids) {

        let result = null

        if(uids == null) return []

        result = await execute(`SELECT * FROM permission WHERE uid IN (${uids.map(e => "?").join(',')}) AND isdeleted = 0`, uids)

        if(result == null) return []
        
        let rows = []
        for(let row of result[0]) {
            rows.push(new Permission(row).getData())
        }

        return rows
        
    }

    /**
     *  Input: array || null 
     *  Output: array
     */
    async getById (ids) {

        let result = null

        if(ids == null) {
            result = await execute("SELECT * FROM permission WHERE isDeleted = 0")
        } else {
            result = await execute(`SELECT * FROM permission WHERE id IN (${ids.map(e => "?").join(',')}) AND isdeleted = 0`, ids)
        }

        if(result == null) return []
        let rows = []
        for(let row of result[0]) {
            rows.push(new Permission(row).getData())
        }

        return rows
        
    }

}

export default PermissionDAO