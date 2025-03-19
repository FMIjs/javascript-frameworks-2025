import { Router, Request, Response } from "express";
import { tasks } from "../storage/tasks";

const taskRouter = Router();

taskRouter.get("/", (_req: Request, res: Response) => {
  res.json(tasks );
});

taskRouter.post("/", (req: Request, res: Response) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
  }
  res.status(200).send();
});

taskRouter.delete("/", (req: Request, res: Response) => {
  const task = req.body.task;
  if (task) {
    const index = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
  }
  res.status(200).send();
});

export default taskRouter;
