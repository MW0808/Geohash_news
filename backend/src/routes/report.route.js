import express from "express";
import {sendReport, getGeohash, upvote, downvote} from "../controllers/report.controller.js";
import { sendNewsletter } from "../controllers/newsletter.controller.js";
import cron from 'node-cron';

const router = express.Router();

// router.get("/get", getReports);
router.get("/getGeohash", getGeohash);

export default router;

router.post("/post", sendReport);
router.post("/upvote", upvote);
router.post("/downvote", downvote);

cron.schedule('* * * * *', async() => { // 0 19 * * * for 7pm
    sendNewsletter();
})
