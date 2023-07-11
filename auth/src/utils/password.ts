import { scrypt, randomBytes } from "crypto";
import { promisify } from "util"; // converts callback based functions to promise based functions

const scryptAsync = promisify(scrypt); // scrypt(password, salt, keylen, options, callback)

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex"); // generate random string utk salt

    const buf = (await scryptAsync(password, salt, 64)) as Buffer; // generate buffer
    return `${buf.toString("hex")}.${salt}`; // return hashed password dan salt setelah titik
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split("."); // split hashed password dan salt

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer; // generate buffer

    return buf.toString("hex") === hashedPassword; // compare hashed password dan buffer hasil supplied password
  }
}
