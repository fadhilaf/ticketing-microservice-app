import express from "express";
import { json } from "body-parser";
import "express-async-errors"; // package ini harus diimport sebelum import routes, karena package ini akan ngehandle error yg terjadi di async function
import cookieSession from "cookie-session";

import { currentUser, requireAuth, errorHandler, NotFoundError } from "@indiestage/common";

import { createTicketRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true); // express akan percaya bahwa proxy yg digunakan adalah proxy yg aman, sehingga express akan mengizinkan request dari proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable cookie encryption (krn pake jwt)
    secure: process.env.NODE_ENV !== "test", // cookie only works if user visit our app using https connection
  })
);

app.use(currentUser);

app.use(requireAuth);

app.use(createTicketRouter);

//for all http method
app.all("*", async (req, res) => {
  // next(new NotFoundError()); // utk middleware yg async, default express ngehandle errornya harus pake "next", jadi parameter middleware ny jg harus req, res, next
  throw new NotFoundError(); //kalo pake package express-async-errors, bisa langsung throw error
});

app.use(errorHandler);

export default app;
