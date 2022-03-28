import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors());

// to change the form data from user into json
// object in the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/api/keys/paypal", (req, res) => {
  res.json(process.env.PAYPAL_CLIENT_ID || "sb"); // sb stands for sandbox
});

//middleware

//express async handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
