import express from "express";
import { createImage } from "../mongodb/controller/dalle.js";

const router = express.Router();

router.post("/", createImage);

export default router;
