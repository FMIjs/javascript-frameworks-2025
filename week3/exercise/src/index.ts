import express from "express";
import cors from "cors";
import apiRouter from "./api";
import { destroy, init } from "./rx-js-examples";
import { Consumer } from "./consumer";

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Api listening on ${port}`)
    const consumer = new Consumer();
});

// init();
// destroy();