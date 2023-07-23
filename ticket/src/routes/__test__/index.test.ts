import request from "supertest";
import app from "../../app";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "title", price: 10 });
};

it("can fetch a list of tickets", async () => {
  // create 3 tickets
  await createTicket();
  await createTicket();
  await createTicket();

  // get all tickets
  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  // compare tickets
  expect(response.body.length).toEqual(3);
});
