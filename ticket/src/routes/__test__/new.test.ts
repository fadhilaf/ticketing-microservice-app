import request from "supertest";
import app from "../../app";
import Ticket from "../../models/ticket";

it("has a route handler listening to /api/tickets POST requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can not be accessed if the user is not signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("can be accessed if the user signed in", async () => {
  const response = await request(app).post("/api/tickets").set("Cookie", global.signin()).send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);
});

it("returns an error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "title", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "title" })
    .expect(400);
});

it("create tickets if valid input is provided", async () => {
  // cek kalau total ticketnya 0 (setiap test dijalankan, database direset)
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "title";
  const price = 10;

  // response created if input is valid
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  // cek kalau total ticketnya 1 (berhasil dibuat 1)
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);

  // cek kalau title dan price sesuai
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});
