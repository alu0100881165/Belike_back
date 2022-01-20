import express from "express";
import cors from "cors";
import * as http from 'http';

import { userRouter } from "./routes/user.routes";

const PORT: number = 3000;

const app = express();
const server: http.Server = http.createServer(app);


app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})