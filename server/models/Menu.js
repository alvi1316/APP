class Menu {

    constructor(data) {
        data = data ?? {}
        this.columns = ['id', 'name', 'url', 'isdeleted']
        this.types = ['int', 'string', 'string', 'int']
        this.tableName = 'menu'
        this.data = {}
        
        this.columns.forEach(col => {
            this.data[col] = data[col]
        })
    }

    getData() { 
        return this.data 
    }

}

export default Menu