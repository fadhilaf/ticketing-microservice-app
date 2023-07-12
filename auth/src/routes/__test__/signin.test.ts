import request from "supertest";
import app from "../../app";

it("fails with not registered email", () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(400);
});

it("fails with incorrect password", async () => {
  // perlu set JWT_KEY karena test jest tidak ada env
  process.env.JWT_KEY = "asdf";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.test",
      password: "wrongpassword",
    })
    .expect(400);
});

it("response with cookie when signin right", async () => {
  // perlu set JWT_KEY karena test jest tidak ada env
  process.env.JWT_KEY = "asdf";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(200);

  // header Set-Cookie yg buat browser nyimpen cookie
  expect(response.get("Set-Cookie")).toBeDefined();
});
