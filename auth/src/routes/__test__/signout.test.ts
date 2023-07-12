import request from "supertest";
import app from "../../app";

it("clear cookie after signout", async () => {
  // perlu set JWT_KEY karena test jest tidak ada env
  process.env.JWT_KEY = "asdf";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.test",
      password: "password",
    })
    .expect(201);

  const response = await request(app).post("/api/users/signout").send({}).expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly" // header set-cookie kalo kita signout (isi session ny kosong trus expire ny di set ke jaman dulu wkwk)
  );
});
