const getTasks = (app, bd) => { app.get('/tasks', function (req, res) {
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
      {message:"Task deleted"})

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

const updateTask = (app, bd) => { app.put('/tasks/:id', function (req, res) {

  let {title, description, status} = req.body

  let changes = 0;

  bd.Tasks = bd.Tasks.map( task => {

      if(req.params.id == task.id){

        if(title != null && title != undefined)
        task.title = title

        if(description != null && description != undefined)
        task.description = description

        if(status != null && status != undefined)
        task.status = status

        ++changes

      }               

      return task

  })   

  if(changes){
    res.json({"Task updated": `${changes}`})
  }else{
    res.json({"Error":"Task not found"})
  }

}) }

  module.exports = {
    getTasks,
    postTasks,
    getTasksById,
    deleteTaskById,
    updateTask
  }