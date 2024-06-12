class Permission {

    constructor(data) {
        data = data ?? {}
        this.columns = ['id', 'mid', 'uid', 'create', 'read', 'update', 'delete', 'isdeleted']
        this.types = ['int', 'int', 'int', 'int', 'int', 'int', 'int', 'int',]
        this.tableName = 'permission'
        this.data = {}
        
        this.columns.forEach(col => {
            this.data[col] = data[col]
        })
    }

    getData() { 
        return this.data 
    }

}

export default Permission