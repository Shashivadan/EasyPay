import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routing";

const app = express();

mongoose.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(3000);
