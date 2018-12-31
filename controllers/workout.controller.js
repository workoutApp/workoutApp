//pull in Service 
var WorkoutService = require('../services/workout.service.js');

// context of module inside the _this variable
_this = this

exports.getWorkouts = async function (req, res, next) {

    // ternary to check query parameters
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    if (req.query.calendarDate) {
        req.query.calendarDate = new Date(req.query.calendarDate);
    }

    try {

        var workouts = await WorkoutService.getWorkouts(req.query, page, limit)

        // return workout list w/HTTP Status Code and Message.
        return res.status(200).json({ status: 200, data: workouts, message: "Succesfully Workouts Recieved" });

    } catch (e) {

        //Return error res message w/code.
        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.createWorkout = async function (req, res, next) {

    // Req.Body has form submit values.
    var workout = {
        calendarDate: req.body.calendarDate,
        userName: req.body.userName,
        exerciseName: req.body.exerciseName,
        workoutType: req.body.workoutType,
        description: req.body.description,
        complete: req.body.complete
        // status: req.body.status

    }

    try {

        // calls Service function w/new object from req b
        var createdWorkout = await WorkoutService.createWorkout(workout)
        return res.status(201).json({ status: 201, data: createdWorkout, message: "Succesfully Created WorkOut" })
    } catch (e) {

        //Return error res message w/code.
        return res.status(400).json({ status: 400, message: "Workout Creation was Unsuccesfull, I am sorry :( " })
    }
}

exports.updateWorkout = async function(req, res, next){

    // add Id for update
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var workout = {
        id,
        calendarDate: req.body.calendarDate ? req.body.calendarDate : null,
        userName: req.body.userName ? req.body.userName : null,
        exerciseName: req.body.exerciseName ? req.body.exerciseName : null,
        workoutType: req.body.workoutType ? req.body.workoutType : null,
        description: req.body.description ? req.body.description : null,
        complete: req.body.complete ? req.body.complete : null,
        // status: req.body.status ? req.body.status : null,

    }


    try{
        var updatedWorkout = await WorkoutService.updateWorkout(workout)
        return res.status(200).json({status: 200, data: updatedWorkout, message: "Succesfully Updated Workout"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeWorkout = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await WorkoutService.deleteWorkout(id)
        return res.status(204).json({status:204, message: "Succesfully Workout Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}


