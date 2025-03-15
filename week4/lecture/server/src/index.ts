import * as path from "path";
global.__basedir = path.join(__dirname, "..");
import express from "express";
import cors from "cors";
import api from "./api";

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
