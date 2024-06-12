class Token {

    constructor(data) {
        data = data ?? {}
        this.columns = ['id', 'uid', 'token', 'isdeleted']
        this.types = ['int', 'int', 'string', 'int']
        this.tableName = 'token'
        this.data = {}
        
        this.columns.forEach(col => {
            this.data[col] = data[col]
        })
    }

    getData() { 
        return this.data 
    }

}

export default Token