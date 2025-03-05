import * as path from "path";

global.__basedir = path.join(__dirname, "..");
import express from "express";
import api from "./api";
import { UserModel } from "./db/user";
import { UserRole } from "@types";

const port = 8080;
const app = express();

const myUser = new UserModel("user");
Promise.all([
  myUser.insert({
    firsName: "1",
    lastName: "1",
    role: UserRole.ADMIN,
  }),
  myUser.insert({ firsName: "2", lastName: "2", role: UserRole.ADMIN }),
  myUser.insert({ firsName: "3", lastName: "3", role: UserRole.ADMIN }),
  myUser.insert({ firsName: "4", lastName: "4", role: UserRole.ADMIN }),
]).then((inserted) => {
  console.log(inserted);
});

// console.log(__basedir);
// app.use("/api", api);

// app.listen(port, () => {
//   console.log(`Server is running on port:${port}`);
// });
