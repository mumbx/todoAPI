class UserContext{
        constructor(bd){
        this.bd = bd;
        
    }

    getAllUsers(){
        return new Promise((resolve, reject)=>{
            this.bd.all('select * from usuarios', (err, rows)=>{        
                if(err){
                    reject(err)
                }else{
                    resolve(rows) 
                }        
            })
        })
    }

    getUserByid(id){ 
        return new Promise((resolve, reject)=>{
            let query = `select * from usuarios where id = ${id}`  
            this.bd.all(query, (err, rows)=>{        
                if(err){
                    reject(err)
                }else{
                    resolve(rows) 
                }  
            })            
        })
    }

    deleteUser(id){
        return new Promise((resolve, reject)=>{  
                let query = 'delete from usuarios where id = (?)'            
                this.bd.run(query, id, err => {                
                    if(err){                
                        reject(err)                
                    }else{
                        resolve('User deleted')                
                    }            
                })
          })

    }

    createUser(values, user){

        return new Promise((resolve, reject)=>{

            const insert = 'INSERT INTO USUARIOS(NOME, EMAIL, SENHA) VALUES(?, ?, ?)'  
            this.bd.run(insert, values, err => {
        
                if(err){
                    reject(err)   
                }else{
                    resolve({Message:'User '+ user.name +' created'})    
                }
    
            })

        })

    }

    updateUser(name, email, password, id){

        return new Promise((resolve, reject)=>{

            let params = [id]
            let query = 'UPDATE USUARIOS SET'      
            let data = []
            let changes = 0;
        
            if(name != null){      
              params.unshift(name)
              data.unshift(' NOME =?')
              ++changes  
            }
        
            if(email != null){
              params.unshift(email)
              data.unshift(' EMAIL =?')
              ++changes
            }
        
            if(password != null){
              params.unshift(password)
              data.unshift(' SENHA =?')
              ++changes
            }
        
            query += data.join(',') + ' WHERE ID = ?' 

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

module.exports = UserContext