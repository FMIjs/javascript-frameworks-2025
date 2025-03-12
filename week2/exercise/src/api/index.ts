import { Router } from "express"
import bookRouter from "./book";

const apiRouter = Router();
apiRouter.use('/books', bookRouter);

export default apiRouter;