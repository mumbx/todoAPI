  const getUsers = (app, User, bd) => { app.get('/users', function (req, res) {
    res.send(bd.Users)
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

    res.json(
      {"message":"user deleted",
       users:bd.Users 
  })

  }) }

  const postUsers = (app, User, bd) => { app.post('/users', function (req, res) {
    
    const Usuario = new User(req.body.name, req.body.email, req.body.password)
    bd.Users.push(Usuario)
    res.send('Usuario Criado')
  
  }) }

  module.exports = {
    getUsers,
    postUsers,
    getUsersByEmail,
    deleteUserByEmail   
  }