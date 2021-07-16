const express = require('express')
const app = express()
const bd = require('./infra/sqlite-db')
const {getUsers, postUsers, getUsersByEmail, deleteUserByEmail, updateUser} = require('./controllers/users-controller')
const {getTasks, postTasks, getTasksById, deleteTaskById, updateTask} = require('./controllers/tasks-controller')


//Models
const User = require('./models/userModel')
const Task = require('./models/taskModel')

//MiddleWares
app.use(express.json())

//Users Routes
getUsers(app, bd)
postUsers(app, User, bd)
getUsersByEmail(app, bd)
deleteUserByEmail(app, bd) 
updateUser(app, bd)

//Tasks Routes
getTasks(app, bd)
postTasks(app, Task, bd)
getTasksById(app, bd) 
deleteTaskById(app, bd)
updateTask(app, bd)


app.listen(3000, ()=>{
    console.log("Servidor rodando na porta: 3000")

})



