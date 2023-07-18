import { Router } from "express";

import { currentUser } from "@indiestage/common";

const router = Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
