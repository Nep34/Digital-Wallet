import express from "express";
import { env } from "./config/env";
const app = express();
app.use(express.json());

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
export default app;
