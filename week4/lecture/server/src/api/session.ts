import { Router } from "express";
import { createToken } from "../modules/auth";

const sessionRouter = Router();

sessionRouter.get("/", (req, res) => {});

sessionRouter.post("/", (req, res, next) => {
  const { email, password } = req.body;
  const authData = { id: "sdadsad" };
  createToken(authData)
    .then((token) => {
      res.send({
        user: {
          id: authData.id,
          firstName: "Ivan",
          lastName: "Ivanov",
          age: 20,
        },
        token,
      });
    })
    .catch((err) => next(err));
});
sessionRouter.delete("/", (req, res) => {});

export default sessionRouter;
