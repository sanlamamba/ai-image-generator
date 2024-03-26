import express from "express";
import { loginRequest, register, verifyJwtToken, verifyMagicLink } from "../mongodb/controller/user.js";

const router = express.Router();

router.post("/", register);

router.post("/verify-otp", verifyMagicLink);

router.get("/verify-token", verifyJwtToken);

router.post("/login", loginRequest);

export default router;
