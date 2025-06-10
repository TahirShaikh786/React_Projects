import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import * as fetchRoute from "./routes/fetchWeather.route.js";

dotenv.config();

const PORT = process.env.PORT;
const app =  express();
const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET",
  credential: true
}

app.use(cors(corsOption));
app.use(bodyparser.json());
app.use("/api/v1", fetchRoute.default);

app.listen(`${PORT}`, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});