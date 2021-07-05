const express = require('express')
const app = express()

const tarefa = {
    'nome':'tarefa maneira',
    }

const tarefas = [tarefa]

const users = [

    {'nome':'antonio',
        'tarefas':[tarefa]  
    },
    
    {'nome':'Murigod',
    'tarefas':[tarefa]  
    },
    
    {'nome':'Hiensen',
    'tarefas':[tarefa]  
    }
    ]

 
app.get('/users', function (req, res) {
  res.send(users)
})
 
app.get('/todos', function (req, res) {
    res.send(tarefas)
  })

app.listen(3000)



