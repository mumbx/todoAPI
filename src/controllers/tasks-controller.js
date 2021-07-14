const getTasks = (app, users, bd) => { app.get('/tasks', function (req, res) {
    res.json(
      {
        tasks:bd.Tasks,
        total:bd.Tasks.length
      }
    )
  }) }

  const getTasksById = (app, bd) => { app.get('/tasks/:id', function (req, res) {

    let filter = bd.Tasks.filter(task => req.params.id == task.id)

    if(filter.length){
      res.send(filter)
    }else{
      res.json({message:"Task not found"})
    }

  }) }

  const deleteTaskById = (app, bd) => { app.delete('/tasks/:id', function (req, res) {

    bd.Tasks = bd.Tasks.filter(tasks => req.params.id != tasks.id)

    res.json(
      {message:"Task deleted",
       users:bd.Tasks
  })

  }) }

const postTasks = (app, Task, bd) => { app.post('/tasks', function (req, res) {
  
  try{    
    const Tarefa = new Task(req.body.title, req.body.description, req.body.status)
    bd.Tasks.push(Tarefa)
    res.json({message:"Tarefa Criada"})

  }catch(e){

    res.json({Error:e.message})

  }  

})}

  module.exports = {
    getTasks,
    postTasks,
    getTasksById,
    deleteTaskById
  }