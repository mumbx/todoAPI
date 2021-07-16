 
  const getUsers = (app, bd) => { app.get('/users', function (req, res) {

    bd.all('select * from usuarios', (err, rows)=>{
      
      if(err){
        res.json({Error:err})
      }else{
        res.json({result:rows})
      }

    })

  }) }

  const getUsersByEmail = (app, bd) => { app.get('/users/:email', function (req, res) {

    let filter = bd.Users.filter(users => req.params.email == users.email)

    if(filter.length){
      res.send(filter)
    }else{
      res.json({"message":"user not found"})
    }

  }) }

  const deleteUserByEmail = (app, bd) => { app.delete('/users/:email', function (req, res) {

    bd.Users = bd.Users.filter(users => req.params.email != users.email)

    res.json({"message":"user deleted"})

  }) }

  const postUsers = (app, User, bd) => { app.post('/users', function (req, res) {
    
    const Usuario = new User(req.body.name, req.body.email, req.body.password)
    bd.Users.push(Usuario)
    res.send('Usuario Criado')
  
  }) }
  
  const updateUser = (app, bd) => { app.put('/users/:email', function (req, res) {

    let {name, email, password} = req.body

    let changes = 0;

    bd.Users = bd.Users.map( user => {

        if(req.params.email == user.email){

          if(email != null && email != undefined)
          user.email = email

          if(name != null && name != undefined)
          user.name = name
  
          if(password != null && password != undefined)
          user.password = password

          ++changes

        }               

        return user

    })   

    if(changes){
      res.json({"Users updateds": `${changes}`})
    }else{
      res.json({"Error":"User not found"})
    }
  
  }) }

  module.exports = {
    getUsers,
    postUsers,
    getUsersByEmail,
    deleteUserByEmail,
    updateUser 
  }