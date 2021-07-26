const Task = require('../models/taskModel')
let TaskContext = require('../Context/TaskContext')

module.exports = (app, bd)=>{

  let taskContext = new TaskContext(bd)

  app.get('/tasks', async (req, res)=>{
      
      try{
        let tasks = await taskContext.getAllTasks()
        res.json(tasks)
      }catch(e){
        res.json({error:e.message})
      }     
  
    })
  
  app.get('/tasks/:id', async (req, res)=>{
  
      try{
       let task = await taskContext.getTaskById(req.params.id)
       res.json(task)
        
      }catch(e){
        res.json({error:e.message})
      }
    
    })
  
    app.delete('/tasks/:id', async (req, res)=>{
  
      try{
        let action = await taskContext.deleteTask(req.params.id)
        res.json(action)        
      }catch(e){
        res.json({error:e.message})
      }
  
    })
  
  app.post('/tasks', async (req, res)=>{
    try{
      const task = new Task(req.body.title, req.body.description, req.body.status, req.body.userId)  
      const values = [task.title, task.description, task.status, task.created, task.userId]
      let created = await taskContext.createTask(values, task)
      res.json(created)
    }catch(e){
      res.json({error:e.message})
    }

  })
  
  app.put('/tasks/:id', async (req, res)=>{
      try{
        let id = req.params.id
        let {title, description, status} = req.body
        let updated = await taskContext.updateTask(title, description, status, id)
        res.json(updated)
      }catch(e){
        res.json({error:e.message})     
      }

  })
  
}



 