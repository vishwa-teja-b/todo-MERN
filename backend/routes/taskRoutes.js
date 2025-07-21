const express = require('express');
const taskController = require("../controllers/taskController");
const router = express.Router();

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTasksById);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.patch("/tasks/:id", taskController.updateTaskPartially);

module.exports = router;    