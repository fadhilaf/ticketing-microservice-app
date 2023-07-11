import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to db"); // constructor dari derived class harus panggil constructor dari parent classny dulu (super()), biar galo galo properti dari parent classny dituruni ke class ini

    //javascript class its weird, every property of a class is put on a "prototype". if we want to add new property i.e. new class function, we can do it after the line of code that define the class end, like this "class.prototype.newFunction = ()=>{}"
    //kalo extend special built in class like Error, instance dari derived class ny harus manual set prototype class ny. tapi kato chatgpt dk perlu
    //Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
