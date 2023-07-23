import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

it("return 404 if ticket does not exist", async () => {
  // trying to get ticket with nonexistent id
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "new title", price: 20 })
    .expect(404);
});

it("return 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).put(`/api/tickets/${id}`).send({ title: "new title", price: 20 }).expect(401);
});

it("return 401 if does not own the ticket", async () => {
  const title = "title";
  const price = 10;

  // create ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  // update ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin()) // signin with new user
    .send({ title: "new title", price: 20 })
    .expect(401);
});

it("return 400 if provide invalid title or price", async () => {
  const title = "title";
  const price = 10;

  const cookie = global.signin();

  // create ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  // update ticket wrong title and price
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  // update ticket wrong price
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title", price: -20 })
    .expect(400);

  // update ticket wrong title
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);
});

it("update the ticket if provided valid input", async () => {
  const title = "title";
  const price = 10;

  const cookie = global.signin();

  // create ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);

  // update ticket
  const newTitle = "new title";
  const newPrice = 20;

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: newTitle, price: newPrice })
    .expect(200);

  // get ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  // check if ticket updated
  expect(ticketResponse.body.title).toEqual(newTitle);
  expect(ticketResponse.body.price).toEqual(newPrice);
});
