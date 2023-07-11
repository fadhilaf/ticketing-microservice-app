import { ValidationError } from "express-validator"; //type validationError dari express-validator yg isiny param2 error validation

import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  //kalo parameter dikasih access specifier (public, private, protected) kito ga perlu deklarasi ulang di dalam class ny langsung auto jadi properti class, kito bisa langsung pake di dalam class ny (this.errors)
  //kalo kito kasih private parameter errors cuman bisa dipake di dalam class itulah. (nilainy dapat dari inputan constructor)
  constructor(private errors: ValidationError[]) {
    super("Invalid request parameter"); // constructor dari derived class harus panggil constructor dari parent classny dulu (super()), biar galo galo properti dari parent classny dituruni ke class ini

    //javascript class its weird, every property of a class is put on a "prototype". if we want to add new property i.e. new class function, we can do it after the line of code that define the class end, like this "class.prototype.newFunction = ()=>{}"
    //kalo extend special built in class like Error, instance dari derived class ny harus manual set prototype class ny. tapi kato chatgpt dk perlu
    //Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
