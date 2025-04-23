
import express, { Request } from "express";
import cors from "cors";

import { IFlowerDTO } from "./types/flower";
import { createFlower, getFlowerById, getFlowers, seedFlowers, trimFlowers, updateFlower } from "./flower.service";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/flower", (_: Request, res) => {
  const flowers = getFlowers();
  res.send(flowers);
});
app.get("/flower/:id", (req, res) => {
  const flowerId = req.params.id;
  const flower = getFlowerById(flowerId);
  res.send(flower);
});

app.post("/flower", (req, res) => {
  const flower = createFlower(req.body as IFlowerDTO);
  res.send(flower);
});
app.post("/flower/seed", (req, res) => {
  const flowers = seedFlowers();
  res.send(flowers);
});
app.put("/flower/trim", (req, res) => {
  const flowers = trimFlowers();
  res.send(flowers);
});
app.patch("/flower/:id", (req, res) => {
  const flowerId = req.params.id;
  const flowerData = req.body as Partial<IFlowerDTO>;
  const flower = updateFlower(flowerId, flowerData as Partial<IFlowerDTO>);
  res.send(flower);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


