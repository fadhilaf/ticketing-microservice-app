import { Schema, Model, model, Document, Types } from "mongoose";

import { Password } from "../utils/password";

// https://mongoosejs.com/docs/typescript/statics-and-methods.html

// interface User Document
interface IUser {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends Model<IUser> {
  build(user: IUser): Document<unknown, {}, IUser> & Omit<IUser & { _id: Types.ObjectId }, never>; //return type ny dapet dari "const user = new User()" type user ny
}

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

userSchema.pre("save", async function (done) {
  //kalo field password involved. cth: new User({email: "test", password: "test"}), atau user.password = "baru" user.save()
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
