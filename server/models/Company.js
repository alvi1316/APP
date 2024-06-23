class Company {

    constructor(data) {
        data = data ?? {}
        this.columns = ['id', 'name', 'description', 'address', 'isdeleted']
        this.types = ['int', 'string', 'string', 'string', 'int']
        this.tableName = 'company'
        this.data = {}
        
        this.columns.forEach(col => {
            this.data[col] = data[col]
        })
    }

    getData() { 
        return this.data 
    }

}

export default Company