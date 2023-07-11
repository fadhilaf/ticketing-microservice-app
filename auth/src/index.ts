import express from "express";
import { json } from "body-parser";
import "express-async-errors"; // package ini harus diimport sebelum import routes, karena package ini akan ngehandle error yg terjadi di async function
import mongoose from "mongoose";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";
import { errorHandler } from "./middlewares/error-handler";

import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

//for all http method
app.all("*", async (req, res) => {
  // next(new NotFoundError()); // utk middleware yg async, default express ngehandle errornya harus pake "next", jadi parameter middleware ny jg harus req, res, next
  throw new NotFoundError(); //kalo pake package express-async-errors, bisa langsung throw error
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

start();
