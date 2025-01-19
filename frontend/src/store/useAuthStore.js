import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import {io} from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set, get) => ({
    authenticatedUser: null,
    signingUp: false,
    loggingIn: false,
    checkingAuthentication: true,
    socket: null,

    checkAuthentication: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authenticatedUser: res.data})
            get().connectSocket();
        } catch (error) {
            console.log(error)
            set({authenticatedUser: null})
            get().connectSocket();
        } finally {
            set({checkingAuthentication: false});
        }
    },

    signup: async (data) => {
        set({signingUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authenticatedUser: res.data});
            get().connectSocket()
        } catch (error) {
            console.log(error)
        } finally {
            set({signingUp: false})
        }
    },

    login: async (data) => {
        set({loggingIn: true})
        try {
            console.log("Hi")
            const res = await axiosInstance.post("/auth/login", data);
            set({authenticatedUser: res.data});
            get().connectSocket()
        } catch (error) {
            console.log(error)
        } finally {
            set({loggingIn: false})
        }
    },

    logout: async () => {
        try {
            console.log("Hello")
            await axiosInstance.post("/auth/logout")
            set({authenticatedUser: null})
            get().disconnectSocket()
        } catch (error) {
            console.log(error)
        }
    },

    connectSocket: () => {
        const { authenticatedUser } = get();
        const existingSocket = get().socket;
    
        if (existingSocket?.connected) return;
    
        const socket = io(BASE_URL, {
            query: authenticatedUser
                ? { userId: authenticatedUser._id }
                : {}, 
        })

        socket.connect();
        set({socket: socket})
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}))