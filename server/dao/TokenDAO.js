import execute from "../utils/db.js"


class TokenDAO {

    /**
     * Input: Token
     * Output: result || null
     */
    async add (token) {
        return await execute("INSERT INTO token(uid, token) VALUES(?, ?)", [token?.uid, token?.token])
    }

    /**
     *  Input: string
     *  Output: boolean
     */
    async tokenIsValid (token) {

        if(token == null) return false

        let result = await execute("SELECT * FROM token WHERE isDeleted = 0 AND token = '?'", [token])

        if(result == null) return false

        if(result[0].length == 0) return false

        return true
        
    }

    /**
     *  Input: string
     *  Output: result || null
     */
    async deleteByToken (token) {
        return await execute("UPDATE token SET isDeleted = 1 WHERE token = '?'", [token])
    }

    /**
     *  Input: int
     *  Output: result || null
     */
    async deleteByUid (uid) {
        return await execute("UPDATE token SET isDeleted = 1 WHERE uid = ?", [uid])
    }

}

export default TokenDAO