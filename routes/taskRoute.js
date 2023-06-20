const express = require("express");
const {
  getAllTasks,
  removeTask,
  addTask,
} = require("../controller/taskController");

const router = express.Router();
router.get("/", getAllTasks);
router.post("/", addTask);
router.delete("/:id", removeTask);

module.exports = router;
