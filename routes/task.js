const express = require('express');
const router = express.Router();

const {
    createTask, deleteTask, getAllTasks, getTask, getTaskBasedOnPriority, updateTask
} = require('../controllers/task');

router.get("/", getAllTasks)
router.post("/", createTask)
router.get("/:id", getTask)
router.get("/:id", updateTask)
router.get("/:id", deleteTask)
router.get("/priority/:level", getTaskBasedOnPriority);

module.exports = router;
