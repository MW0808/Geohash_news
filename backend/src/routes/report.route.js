import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getReports, sendReport } from "../controllers/report.controller.js";