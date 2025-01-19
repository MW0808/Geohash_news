import express from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller";
import User from "../models/user.model";

const router = express.Router();

router.post("/subscribe/", subscribeToNewsletter);