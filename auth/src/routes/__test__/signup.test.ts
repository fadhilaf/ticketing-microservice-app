import request from "supertest";
import app from "../../app";

// This is a test to see if the signup route is working
it("returns a 201 on successful signup", () => {
  // perlu set JWT_KEY karena test jest tidak ada env
  process.env.JWT_KEY = "asdf";

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "p",
    })
    .expect(400);
});

it("dissalows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  process.env.NODE_ENV = "test";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(201);

  // expect the response to have a define Set-Cookie header
  // header Set-Cookie yg buat browser nyimpen cookie
  expect(response.get("Set-Cookie")).toBeDefined();
});
