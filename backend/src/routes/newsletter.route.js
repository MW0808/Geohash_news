import express from "express";
import { subscribeToNewsletter, getNewsletter } from "../controllers/newsletter.controller.js";

const router = express.Router();

router.post("/subscribe/", subscribeToNewsletter);
router.post("/getNewsletter", getNewsletter);

export default router;