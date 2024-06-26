class User {

    constructor(data) {
        data = data ?? {}
        this.columns = ['id', 'name', 'email', 'password', 'isdeleted', 'isadmin']
        this.types = ['int', 'string', 'string', 'string', 'int', 'int']
        this.tableName = 'users'
        this.data = {}
        
        this.columns.forEach(col => {
            this.data[col] = data[col]
        })
    }

    getData() { 
        return this.data 
    }

}

export default User