class Menu {

    constructor(data) {
        data = data ?? {}
        this.columns = ['id', 'name', 'url', 'params', 'isdeleted']
        this.types = ['int', 'string', 'string', 'string', 'int']
        this.tableName = 'menu'
        this.data = {}
        
        this.columns.forEach(col => {
            this.data[col] = data[col]
        })

        //Defaults
        if(typeof data['params'] !== 'string') {
            data['params'] = ''
        } 
    }

    getData() { 
        return this.data 
    }

}

export default Menu