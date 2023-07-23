import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import request from "supertest";

import app from "../app";

//buat global function (function yg bisa diakses di semua test, dan dk perlu export export lagi)
declare global {
  var signin: () => string[];
}

// instance mock mongodb yg dijalankan di memori (biar cepet, cepet dibuat, cepet diakses, cepet diapus)
let mongo: MongoMemoryServer;

// hook yg dijalankan sebelum semua test dijalankan
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// hook yg dijalankan sebelum setiap test dijalankan
beforeEach(async () => {
  // reset semua data di tiap collection di instance mongodb
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// hook yg dijalankan setelah semua test dijalankan
afterAll(async () => {
  // stop instance mongodb dan tutup koneksi mongoose
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

//fungsi global signin utk helper test
global.signin = () => {
  // perlu set JWT_KEY karena test jest tidak ada env
  process.env.JWT_KEY = "asdf";

  // karena di service ticket tidak ada signup, maka kita buat jwt token manual
  // kenapa tidak call service auth saja? karena kita tidak mau test service auth, kita hanya mau test service ticket (no dependency on other service)

  // build jwt payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.test",
  };

  // create jwt token
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object
  const session = { jwt: token };

  // convert session object to json
  const sessionJSON = JSON.stringify(session);

  // encode session json to base64 (karena cookie yg dikirim ke browser harus berupa string, dan string tsb harus berupa encoding base64)
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // masukin jwt token ny ke template string yang menyerupai cookie header asli (tapi kalo seperti ini, bakal perlu diupdate trus seiring berubahnya cookie header asli)
  return [`session=${base64}`];
};
