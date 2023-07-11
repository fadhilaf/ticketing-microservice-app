//abstract class, ketika perlu meng-inherit class dan membuat bluprint (interface) at the same time
export abstract class CustomError extends Error {
  abstract statusCode: number;

  //message parameterny harus diisi, jadi class yg inherit ini harus isi super(message) di constructor ny
  constructor(private log: string) {
    //masih perlu message, misal utk log purposes
    //memberi nilai message ke constructor parent class (Error), jadi samo kayak new Error("message")
    super(log); // constructor dari derived class harus panggil constructor dari parent classny dulu (super()), biar galo galo properti dari parent classny dituruni ke class ini

    //javascript class its weird, every property of a class is put on a "prototype". if we want to add new property i.e. new class function, we can do it after the line of code that define the class end, like this "class.prototype.newFunction = ()=>{}"
    //kalo extend special built in class like Error, instance dari derived class ny harus manual set prototype class ny. tapi kato chatgpt dk perlu
    //Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
