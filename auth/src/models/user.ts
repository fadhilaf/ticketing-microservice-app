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

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //kalo mau customize response json dari model, kito bisa pake toJSON
    toJSON: {
      //ikuti cara serialize json dari mongoose
      transform(doc, ret) {
        delete ret.password; //kalo mau delete field dari object, kito bisa pake "delete {obj}.{field}". (syntax javascript yg jarang dipake)
        delete ret.__v;
        ret.id = ret._id; //kalo mau rename field dari object, kito bisa pake {new field name} = {old field name}.
        delete ret._id;
      },
    },
  }
);
//buat fungsi utk membuat instance model user baru, yang juga mengecek parameter yg diberikan
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
