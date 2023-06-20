const express = require("express");
const {
  getAllTasks,
  removeTask,
  addTask,
  toggleTaskCompletion,
  getTask,
} = require("../controller/taskController");

const router = express.Router();
router.get("/:id", getTask);
router.get("/", getAllTasks);
router.post("/", addTask);
router.delete("/:id", removeTask);
router.put("/:id", toggleTaskCompletion);

module.exports = router;
