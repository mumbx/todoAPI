 const User = require('../models/userModel')
 const UserContext = require('../Context/UserContext')

  module.exports = (app, bd)=>{

    let userContext = new UserContext(bd)

    app.get('/users', async (req, res)=>{ 

      try{
        let rows = await userContext.getAllUsers()
        res.json({Results:rows})
      }
      catch(e){
        res.json({error:e.message})
      }      

    })
  
    app.get('/users/:id', async (req, res)=>{
      
      try{
        let rows = await userContext.getUserByid(req.params.id)
        res.json({Results:rows})
      }
      catch(e){
        res.json({error:'User not found or invalid parameters'})
      }  
      
  
    })
  
    app.delete('/users/:id', async (req, res)=>{
      
      try{
        let action = await userContext.deleteUser(req.params.id)
        res.json({Action:action})
      }catch(e){
        res.json({error:'User not deleted or invalids parameters'})
      }
     
  
    }) 
  
   app.post('/users', async (req, res)=>{

      try{
        const user = new User(req.body.name, req.body.email, req.body.password)  
        const values = [user.name, user.email, user.password]
        let created = await userContext.createUser(values, user)
        res.json(created)
        
      }catch(e){
        res.json({error:e.message})
      }     
      
    })
    
    app.put('/users/:id', async (req, res)=>{

      let id = req.params.id
      let {name, email, password} = req.body

      try{        
        let update = await userContext.updateUser(name, email, password, id)
        res.json(update)
      }catch(e){
        res.json({error:e.message})
      }    

    }) 
  
  }