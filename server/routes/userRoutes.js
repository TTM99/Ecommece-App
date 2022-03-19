import express from "express";
import User from "../models/userModel.js";
import bcyrpt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

//Using expressAysncHandler we can catch the error in the
//async function inside it
//Simple middleware for handling exceptions inside of async
// express routes and passing them to your express error handlers.
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcyrpt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
  })
);

export default userRouter;
