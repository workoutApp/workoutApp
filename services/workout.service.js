// Access our newly created Mongoose Model
var Workout = require('../models/workout.model.js')

// Let's use an Async function to get the To Do List
exports.getWorkouts = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function that way we have some error handling set. Waiting for the promise
        
    try {
        var workouts = await Workout.paginate(query, options)
        
        //Once the Mongoose promise is returned we're going to go ahead and return the To Do List it has produced 

        return workouts;

    } catch (e) {

        //If the try didn't work we're going to go ahead and let the users know what kind of error we have

        throw Error('Oh No! We got an error while Paginating our To-Do Tasks, so sorry!' )
    }
}

exports.createWorkout = async function(workout){
    
    // Creating a new Mongoose Object by using the new keyword

    var newWorkout = new Workout({
        calendarDate: workout.calendarDate,
        userName: workout.userName,
        exerciseName: workout.exerciseName,
        description: workout.description,
        workoutType: workout.workoutType,
        complete: workout.complete
    })

    try{

        // Let's go ahead and save the Workout 

        var savedWorkout = await newWorkout.save()

        return savedWorkout;
    }catch(e){
      
        //if we can't create a Workout we want to throw an error 

        throw Error("Error while Creating Workout")
    }
}

exports.updateWorkout = async function(workout){
    var id = workout.id

    try{
        //Find the old Workout Object by the Id
    
        var oldWorkout = await Workout.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Workout")
    }

    // If no old Workout Object exists return false

    if(!oldWorkout){
        return false;
    }

    console.log(oldWorkout)

    //Edit the Workout Object

    oldWorkout.calendarDate = Workout.calendarDate;
    oldWorkout.userName = Workout.userName;
    oldWorkout.exerciseName = Workout.exerciseName;
    oldWorkout.description = Workout.description;
    oldWorkout.workoutType = Workout.workoutType;
    oldWorkout.complete = Workout.complete;

    console.log(oldWorkout)

    try{
        var savedWorkout = await oldWorkout.save()
        return savedWorkout;
    }catch(e){
        throw Error("And Error occured while updating the Workout");
    }
}

exports.deleteWorkout = async function(id){
    
    // Delete the Workout

    try{
        var deleted = await Workout.deleteOne({_id: id})
        if(deleted.n === 0){
            throw Error("Workout Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Workout")
    }
}