import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  //kalo middleware dalam bentuk array, kito bisa masukin lebih dari 1 middleware gek di iterasi satu2
  [
    // middleware express-validator
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    // middleware express-validator dk biso return response error, jadi kito handle di controller ambil cek hasil validasiny pake validationResult trus return response error kalo error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array()); //kalo derived class dari class Error, kito bisa throw class errorny. (kalo perlu type class di javascript kito biso assign subclassny auto upcasting)
    }

    const { email, password } = req.body;

    throw new DatabaseConnectionError(); //kalo derived class dari class Error, kito bisa throw class errorny (kalo perlu type class di javascript kito biso assign subclassny auto upcasting)

    res.send({});
  }
);

export { router as signupRouter };
