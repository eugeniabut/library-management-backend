import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome User ");
});
app.use("/books", booksRoutes);


connectDB()
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Something went wrong";
    res.status(error.statusCode).send(error.message);
  });
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });