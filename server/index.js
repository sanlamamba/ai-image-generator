import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./utils/jsonwebtoken/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:8081", "http://localhost:80", "http://localhost", "https://gleaming-sprinkles-c46725.netlify.app"],
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/api/v1", (req, res) => {
  const uptime = process.uptime();
  const uptimeString = new Date(uptime * 1000).toISOString().substr(11, 8);
  const version = process.env.VERSION;
  const message = {
    message: "Welcome to Dalle API",
    "origin-allowed":[ "http://localhost:8080, http://localhost:8081, http://localhost:80", "https://gleaming-sprinkles-c46725.netlify.app"],
    health: "healthy",
    "running-for": uptimeString,
  };
  res.json(message);


})

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});

// middleware to unwrap the token and attach the user to the request object only for the routes dalle
app.use("/api/v1/dalle", (req, res, next) => {
  try {
    // check if the token is present in the headers
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Please Authenticate" });
    }
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Please Authenticate" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Please Authenticate" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Dalle API",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
