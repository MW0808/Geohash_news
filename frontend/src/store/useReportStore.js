import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js"
import { useAuthStore } from "./useAuthStore.js";
import Geohash from "latlon-geohash";

export const useReportStore = create((set, get) => ({
    geohash: "",
    reports: [],
    loadingReports: false,
    submittingReport: false,
    loadedNewsletter: null,
    loadingNewsLetter: false,

    getGeoHash: (lat, long) => {
        const geohash = Geohash.encode(lat, long, 6);
        set({geohash: geohash})
    },

    getReports: async () => {
        set({loadingReports: true})
        try {
            const {geohash} = get();
            const res = await axiosInstance.get(`/reports/get/${geohash}`)
            console.log(res.data)
            set({reports: res.data})
        } catch (error) {
            console.log(error)
        } finally {
            set({loadingReports: false})
        }
    },

    upvote: async (_id) => {
        try {
            const res = await axiosInstance.post("/reports/upvote", {_id})
            set({reports: [...get().reports.filter((report) => (report._id != _id)), res.data]})
        } catch (error) {
            console.log(error)
        }
    },

    downvote: async (_id) => {
        try {
            const res = await axiosInstance.post("/reports/downvote", {_id})
            set({reports: [...get().reports.filter((report) => (report._id != _id)), res.data]})
        } catch (error) {
            console.log(error)
        }
    },

    subscribeToReports: () => {
        const {reports} = get();
        if (!reports) return;
        const socket = useAuthStore.getState().socket;
        socket.on("newReport", (newReport) => {
            if (!get().reports.includes(newReport)) {
                set({reports: [...get().reports, newReport]});
            }
        })
    },

    submitReport: async (data) => {
        const posterId = useAuthStore.getState().authenticatedUser._id;
        const {geohash} = get();
        try {
            await axiosInstance.post("/reports/post", {...data, location: geohash, posterId});
        } catch (error) {
            console.log(error)
        }
    },

    getNewsletter: async (data) => {
        set({loadingNewsLetter: true})
        try {
            const newsletter = await axiosInstance.post("/news/getNewsletter", data);
            set({loadedNewsletter: newsletter});
        } catch (error) {
            console.log(error)
        } finally {
            set({loadingNewsLetter: false})
        }
    }

    
}))