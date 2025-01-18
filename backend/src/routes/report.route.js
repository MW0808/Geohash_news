import express from "express";
import {sendReport, getGeohash, upvote, downvote} from "../controllers/report.controller.js";

const router = express.Router();

// router.get("/get", getReports);
router.get("/getGeohash", getGeohash);

export default router;

router.post("/post", sendReport);
router.post("/upvote", upvote);
router.post("/downvote", downvote);