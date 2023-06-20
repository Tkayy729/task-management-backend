const request = require("supertest");
const app = require("../index");
const Task = require("../models/task");
const { createTask } = require("../dbservice/taskService");

process.env.NODE_ENV = 'test';


afterEach(async () => {
  await Task.deleteMany();
});

describe("TaskController", () => {
  describe("GET /api/tasks", () => {
    it("should return all tasks", async () => {
      const response = await request(app).get("/api/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        name: "Task 1",
        description: "Task 1 description",
      };
      const response = await request(app).post("/api/tasks").send(taskData);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(taskData.name);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.completed).toBe(false);

      // Verify the task was saved in the database
      const task = await Task.findById(response.body._id);
      expect(task).toBeDefined();
      expect(task.name).toBe(taskData.name);
      expect(task.description).toBe(taskData.description);
      expect(task.completed).toBe(false);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task", async () => {
      const taskData = {
        name: "Task 3",
        description: "Task 3 description",
      };
      const createdTask = await createTask(taskData.name, taskData.description);

      const response = await request(app).delete(
        `/api/tasks/${createdTask._id}`
      );
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(taskData.name);
      expect(response.body.description).toBe(taskData.description);

      // Verify the task was deleted from the database
      const deletedTask = await Task.findById(createdTask._id);
      expect(deletedTask).toBeNull();
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should toggle a task completion", async () => {
      const taskData = {
        name: "Task 3",
        description: "Task 3 description",
      };
      const createdTask = await createTask(taskData.name, taskData.description);

      console.log("createTask", createdTask);

      const response = await request(app).put(`/api/tasks/${createdTask._id}`);
      expect(response.status).toBe(200);
      expect(response.body.completed).toBe(true);
    });
  });
});
