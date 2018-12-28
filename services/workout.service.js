// Access our newly created Mongoose Model
var ToDo = require('../models/workout.model.js')

// Let's use an Async function to get the To Do List
exports.getTodos = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function that way we have some error handling set. Waiting for the promise
        
    try {
        var todos = await ToDo.paginate(query, options)
        
        //Once the Mongoose promise is returned we're going to go ahead and return the To Do List it has produced 

        return todos;

    } catch (e) {

        //If the try didn't work we're going to go ahead and let the users know what kind of error we have

        throw Error('Oh No! We got an error while Paginating our To-Do Tasks, so sorry!' )
    }
}

exports.createTodo = async function(todo){
    
    // Creating a new Mongoose Object by using the new keyword

    var newTodo = new ToDo({
        calendarDate: todo.calendarDate,
        userName: todo.userName,
        workoutName: todo.userName,
        description: todo.description,
        workoutType: todo.workoutType,
        complete: todo.complete
    })

    try{

        // Let's go ahead and save the Todo 

        var savedTodo = await newTodo.save()

        return savedTodo;
    }catch(e){
      
        //if we can't create a Todo we want to throw an error 

        throw Error("Error while Creating Todo")
    }
}

exports.updateTodo = async function(todo){
    var id = todo.id

    try{
        //Find the old Todo Object by the Id
    
        var oldTodo = await ToDo.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    // If no old Todo Object exists return false

    if(!oldTodo){
        return false;
    }

    console.log(oldTodo)

    //Edit the Todo Object

    oldTodo.calendarDate = oldTodo.calendarDate;
    oldTodo.userName = oldTodo.userName;
    oldTodo.workoutName = oldTodo.userName;
    oldTodo.description = oldTodo.description;
    oldTodo.workoutType = oldTodo.workoutType;
    oldTodo.complete = oldTodo.complete;

    console.log(oldTodo)

    try{
        var savedTodo = await oldTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function(id){
    
    // Delete the Todo

    try{
        var deleted = await ToDo.deleteOne({_id: id})
        if(deleted.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}