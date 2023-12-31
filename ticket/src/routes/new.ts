import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@indiestage/common";

import Ticket from "../models/ticket";

const router = Router();

router.post(
  "/api/tickets",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
