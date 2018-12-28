var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created
var WorkoutController = require('../../controllers/todo.controller.js');


// Map each API to the Controller FUnctions
router.get('/', WorkoutController.getTodos)

router.post('/', WorkoutController.createTodo)

router.put('/', WorkoutController.updateTodo)

router.delete('/:id',WorkoutController.removeTodo)


// Export the Router
module.exports = router;