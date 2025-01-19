import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js"
import { useAuthStore } from "./useAuthStore.js";

export const useReportStore = create((set, get) => ({
    geohash: null,
    reports: [],
    loadingReports: false,

    getGeoHash: async (lat, long) => {
        try {
            const res = await axiosInstance.post("/reports/getGeohash", {lat: lat, long: long})
            set({geohash: res.data})
        } catch (error) {
            console.log(error)
        }
    },

    getReports: async () => {
        console.log(get().geohash)
        set({loadingReports: true})
        try {
            const geohash = get().geohash;
            const res = await axiosInstance.get(`/reports/get/${geohash}`)
            set({reports: res.data})
        } catch (error) {
            console.log(error)
        } finally {
            set({loadingReports: false})
        }
    },

    upvote: async (_id) => {
        try {
            const res = await axiosInstance.post("/reports/upvote")
            set({reports: [...get().reports.filter((report) => (report._id != _id)), res.data]})
        } catch (error) {
            console.log(error)
        }
    },

    downvote: async (_id) => {
        try {
            const res = await axiosInstance.post("/reports/downvote")
            set({reports: [...get().reports.filter((report) => (report._id != _id)), res.data]})
        } catch (error) {
            console.log(error)
        }
    },

    subscribeToReports: () => {
        const socket = useAuthStore.getState().socket;
        socket.on("newReport", (newReport) => {
            set({reports: [...get().reports, newReport]});
        })
    },

    subscribeToVotes: () => {
        const socket = useAuthStore.getState().socket;
        socket.on("scoreUpdate", (updatedReport) => {
            set({reports: [...get().reports.filter(report => report._id != updatedReport._id), newReport]});
        })
    },

    
}))