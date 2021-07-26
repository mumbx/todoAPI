class TaskContext{
    constructor(bd){
    this.bd = bd;
    
}

getAllTasks(){

    return new Promise((resolve, reject)=>{

        this.bd.all('select * from tarefas', (err, rows)=>{
          
            if(err){
              reject(err)
            }else{
              resolve({
                  Results:rows,
                  "Total rows":rows.length       
                })
            }
      
        })   

    })    
}

getTaskById(id){

    return new Promise((resolve, reject)=>{

        let query = `select * from tarefas where id = ${id}`    
        this.bd.all(query, (err, rows)=>{
            
            if(err){
              reject(err)
            }else{
              resolve({result:rows})
            }
    
        })

    })
}

deleteTask(id){
    
    return new Promise((resolve, reject)=>{ 

        let query = 'delete from tarefas where id = (?)'    
        this.bd.run(query, id, err => {
    
            if(err){
              reject(err)  
      
            }else{
              resolve({Message:'Task deleted'})      
            }
    
        })

    })

}

createTask(values, task){
    
    return new Promise((resolve, reject)=>{
        const insert = 'INSERT INTO TAREFAS(TITULO, DESCRICAO, STATUS, DATACRIACAO, ID_USUARIO) VALUES(?, ?, ?, ?, ?)'
  
        this.bd.run(insert, values, err => {
      
          if(err){
            reject(err)   
          }else{
            resolve({Message:'Task '+ task.title +' created'})      
          }
      
        })

    })
}

updateTask(title, description, status, id){

    return new Promise((resolve, reject)=>{

        
        let query = 'UPDATE TAREFAS SET'
        let params = [id]
        let data = []
        let changes = 0;

        if(title != null){      
            params.unshift(title)
            data.unshift(' TITULO =?')
            ++changes

        }

        if(description != null){
            params.unshift(description)
            data.unshift(' DESCRICAO =?')
            ++changes
        }

        if(status != null){
            params.unshift(status)
            data.unshift(' STATUS =?')
            ++changes
        }

        query += data.join(',') + ' WHERE ID = ?'   

        console.log(query, params)

        this.bd.run(query, params, err => {

            if(err){
            reject(err)   
            }else{
            resolve({Changes:changes})

            }

        })

    })

}

}

module.exports = TaskContext