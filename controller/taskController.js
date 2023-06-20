const Task = require("../models/task");
const {
  findAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../dbService/taskService");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await findAllTask();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const task = await createTask(name, description);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await updateTask(id, completed);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

const deleteTask = async (req, res) => {
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
  createTask,
  updateTask,
  deleteTask,
};
