import express from "express";
import * as fetchWeather from "../controllers/fetchWeather.control.js";

const router = express.Router();

router.get("/:city", fetchWeather.default);

export default router;