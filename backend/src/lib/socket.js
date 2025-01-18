import { Server } from "socket.io";
import http from "http";
import express from "express"
import Geohash from "latlon-geohash"

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

io.on("connection", (socket) => {
    console.log("A user has connected at", socket.id);

    socket.on("sendLocation", (location) => {
        const {lat, long} = location;
        console.log(Geohash.encode(lat, long, 6));
    })

    socket.on("disconnect", (socket) => {
        console.log("A user has disconnected");
    })
})

export { app, server, io };