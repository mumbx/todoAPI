var idUser = 0;

class User{
    constructor(name, email, password)
    {
        this.id = ++idUser;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;