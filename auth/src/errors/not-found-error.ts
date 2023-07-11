import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");

    //javascript class its weird, every property of a class is put on a "prototype". if we want to add new property i.e. new class function, we can do it after the line of code that define the class end, like this "class.prototype.newFunction = ()=>{}"
    //kalo extend special built in class like Error, instance dari derived class ny harus manual set prototype class ny. tapi kato chatgpt dk perlu
    //Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
