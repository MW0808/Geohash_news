import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js"
import { io } from "socket.io-client";
import { disconnect } from "mongoose";

const BASE_URL = "http://localhost:5001"

export const useReportStore = create((set, get) => ({
    socket: null,
    reports: [],
    isGettingReports: false,
    isUpdatingReport: false,

    connectSocket: () => {
        const socket = io(BASE_URL);
        socket.connect();
        set({socket: socket});
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

    getGeohash: async (lat, long) => {
        try {
            const res = await axiosInstance.get(`/getGeoHash?lat=${lat}&long=${long}`);
            //const geoHash =
        } catch (error) {
            
        }
    }
}))