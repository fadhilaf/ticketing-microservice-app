import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import request from "supertest";

import app from "../app";

//buat global function (function yg bisa diakses di semua test, dan dk perlu export export lagi)
declare global {
  var signin: () => Promise<string[]>;
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
global.signin = async () => {
  // perlu set JWT_KEY karena test jest tidak ada env
  process.env.JWT_KEY = "asdf";

  const email = "test@test.test";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  return response.get("Set-Cookie");
};
