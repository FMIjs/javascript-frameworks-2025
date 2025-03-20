import express from "express";
import bodyParser from "body-parser";
import taskRouter from "./api/task";
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:9000',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
}));

// Routes
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
