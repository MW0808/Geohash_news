import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import {io} from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set, get) => ({
    authenticatedUser: null,
    signingIn: false,
    loggingIn: false,
    checkingAuthentication: true,
    socket: null,

    checkAuthentication: async () => {
        try {
            const result = axiosInstance.get("/auth/check");
            set({authenticatedUser: res.data})
            get().connectSocket();
        } catch (error) {
            console.log(error)
            set({authenticatedUser: null})
        } finally {
            set({checkAuthentication: false});
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
            set({signingIn: false})
        }
    },

    login: async (data) => {
        set({loggingIn: true})
        try {
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
            await axiosInstance.post("/auth/logout")
            set({authenticatedUser: null})
            get().disconnectSocket()
        } catch (error) {
            console.log(error)
        }
    },

    connectSocket: () => {
        const {authenticatedUser} = get()
        if (!authenticatedUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authenticatedUser._id
            }
        })
        socket.connect()
        set({socket: socket})
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}))