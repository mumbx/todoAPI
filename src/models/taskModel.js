var idTask = 0;

class Task{

    constructor(title, description, status)
    {      

        if(title.length >= 4 && typeof title == "string"){
            this.id = ++idTask;
            this.title = title;
        }else{
            throw new Error('Title must have more than 4 characters')
        }
        
        if(description.length >= 5 && typeof title == "string"){
            this.description = description;
        }else{
            throw new Error('Description must have more than 5 characters')
        }

        if(status.length >= 5 && typeof title == "string"){
            this.status = status;
        }else{
            throw new Error('Status must have more than 5 characters')
        }      
 

        this.created = new Date();
    }
}

module.exports = Task;