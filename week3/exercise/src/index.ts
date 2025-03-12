import express from "express";
import apiRouter from "./api";
import { destroy, init } from "./rx-js-examples";

const port = 3000;

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Api listening on ${port}`)
});

init();
destroy();