//file for testing where test environment variables are loaded
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import bookRoutes from "./routes/books.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import paymentRoutes from "./routes/payment.js";

config({ path: "./test.env" });
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/books", bookRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/payment", paymentRoutes);

const CONNECTION_URL = process.env.DB_URL;

//connecting to the test database
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

export default app;
