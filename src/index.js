const express = require('express')
const app = express()
const {getUsers, postUsers, getUsersByEmail, deleteUserByEmail} = require('./controllers/users-controller')
const {getTasks, postTasks, getTasksById, deleteTaskById} = require('./controllers/tasks-controller')
const bd = require('./infra/bd')

//Models
const User = require('./models/userModel')
const Task = require('./models/taskModel')

//MiddleWares
app.use(express.json())

//Users Routes
getUsers(app, User, bd)
getTasks(app, User, bd)
getUsersByEmail(app, bd)
deleteUserByEmail(app, bd) 

//Tasks Routes
postUsers(app, User, bd)
postTasks(app, Task, bd)
getTasksById(app, bd) 
deleteTaskById(app, bd)

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta: 3000")
})



