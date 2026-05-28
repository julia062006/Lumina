import express from "express";
import router from "./router";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use(cors());

app.use(router);

app.use("/uploads", express.static("uploads"));

export default app;

