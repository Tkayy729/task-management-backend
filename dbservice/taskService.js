const Task = require("../models/task");

const findAllTasks = async () => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

const findTask = async (id) => {
  try {
    const task = await Task.findById(id);
    console.log('task',   task)
    return task;
  } catch (error) {
    throw new Error("Failed to fetch task");
  }
};

const createTask = async (name, description) => {
  try {
    const task = new Task({ name, description });
    await task.save();
    return task;
  } catch (error) {
    throw new Error("Failed to create task");
  }
};

const deleteTask = async (id) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    return task;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};

module.exports = {
  findAllTasks,
  findTask,
  createTask,
  deleteTask
};
