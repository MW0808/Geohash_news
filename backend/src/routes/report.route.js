import express from "express";
import { generateNewsletter } from "../controllers/newsletter.controller.js";
import cron from 'node-cron';
import {sendReport, getReports, getGeohash, upvote, downvote} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/get/:geohash", getReports);
router.post("/getGeohash", getGeohash);

export default router;

router.post("/post", sendReport);
router.post("/upvote", upvote);
router.post("/downvote", downvote);
