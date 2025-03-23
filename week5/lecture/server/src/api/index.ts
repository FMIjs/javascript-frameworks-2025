import { Router } from "express";
import userRouter from "./user";
import sessionRouter from "./session";

const apiRouter = Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/session", sessionRouter);

export default apiRouter;
