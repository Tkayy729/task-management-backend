const Task = require("../models/task");
const {
  findAllTasks,
  createTask,
  deleteTask,
} = require("../dbService/taskService");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await findAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const task = await createTask(name, description);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await deleteTask(id);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  removeTask,
};
