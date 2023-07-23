import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

it("return 404 if ticket not found", async () => {
  // trying to get ticket with nonexistent id
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).set("Cookie", global.signin()).send().expect(404);
});

it("return ticket if ticket found", async () => {
  const title = "title";
  const price = 10;

  // create ticket
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  // get ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  // compare ticket
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
