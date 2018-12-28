var express = require('express')
var router = express.Router()





// Getting the Todo Controller that we just created
var WorkoutController = require('../../controllers/workout.controller.js');


// Map each API to the Controller FUnctions
router.get('/', WorkoutController.getWorkouts)

router.post('/', WorkoutController.createWorkout)

router.put('/', WorkoutController.updateWorkout)

router.delete('/:id',WorkoutController.removeWorkout)


// Export the Router
module.exports = router;