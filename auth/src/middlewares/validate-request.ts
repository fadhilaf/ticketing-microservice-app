import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // middleware express-validator dk biso return response error, jadi kito handle di controller ambil cek hasil validasiny pake validationResult trus return response error kalo error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array()); //kalo derived class dari class Error, kito bisa throw class errorny. (kalo perlu type class di javascript kito biso assign subclassny auto upcasting)
  }

  next();
};
