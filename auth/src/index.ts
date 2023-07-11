import express from "express";
import { json } from "body-parser";

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

app.get("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
