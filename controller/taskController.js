const Task = require("../models/task");
const {
  findAllTasks,
  createTask,
  deleteTask,
  findTask,
} = require("../dbservice/taskService");

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await findTask(id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

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

const toggleTaskCompletion = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await findTask(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  removeTask,
  toggleTaskCompletion,
  getTask,
};
