import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { generateNewsletter } from "./controllers/newsletter.controller.js";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js"
import reportRoutes from "./routes/report.route.js"


dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use("/api/reports", reportRoutes);

cron.schedule('* * * * *', async() => { // 0 19 * * * for 7pm
    generateNewsletter();
})

server.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
    connectDB();
});