import { Router, Request, Response } from "express";
import { tasks } from "../storage/tasks";

const taskRouter = Router();

taskRouter.get("/", (_req: Request, res: Response) => {
  res.json(tasks);
});

taskRouter.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Invalid task name' });
    }
    
    const newTask = { id: tasks.length + 1, name: name.trim() };
    tasks.push(newTask);
    
    if (tasks.find(task => task.id === newTask.id)) {
      res.status(201).json(newTask);
    } else {
      res.status(500).json({ error: 'Failed to add task' });
    }
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

taskRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    const index = tasks.findIndex((task) => task.id === parseInt(id));

    if (index !== -1) {
      const deleteResource = tasks[index];
      tasks.splice(index, 1);
      res.status(200).send(deleteResource);
    }
    else{
      res.status(204).send();
    }
  }
});

export default taskRouter;
