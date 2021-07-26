const express = require('express')
const app = express()
const bd = require('./infra/sqlite-db')
const UserRoutes = require('./controllers/users-controller')
const TasksRoutes = require('./controllers/tasks-controller')
const cors = require('cors')


//Models
const User = require('./models/userModel')
const Task = require('./models/taskModel')

//MiddleWares
app.use(express.json())
app.use(cors())

//Users Routes
UserRoutes(app, bd)

//Tasks Routes
TasksRoutes(app, bd)


app.listen(3000, ()=>{
    console.log("Servidor rodando na porta: 3000")

})



