import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rootRouter from "./routes/index.js";

const app = express();

mongoose.connect(process.env.MONGOOES_CONNECTION);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT);
