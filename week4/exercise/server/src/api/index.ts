import { Router } from "express";
import tasksRouter from "./task";

const apiRouter = Router();
apiRouter.use("/tasks", tasksRouter);

export default apiRouter;
