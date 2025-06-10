import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import todoRoute from "./routes/todo.route.js";

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PATCH, HEAD, PUT, DELETE",
  credential: true
}

dotenv.config();
const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());

app.use("/api/v1", todoRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});