import express from "express";
import bodyParser from "body-parser";
import path from "path";
import taskRouter from "./api/task";

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
