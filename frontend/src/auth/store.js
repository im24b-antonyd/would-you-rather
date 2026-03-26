import {create} from 'zustand'
import {loginUser, logoutUser} from "../services/UserService.js";
import {persist} from "zustand/middleware";
import toast from "react-hot-toast";


const LOCAL_KEY = "auth_app"

/*
const AuthState = {
    // 1. Properties (State)
    accessToken: null, // Use null for "no value"
    user: null,        // Represents no user logged in
    authStatus: false, // Should be false initially
    authLoading: false,

    // 2. Actions (Methods)
    login: (loginResponseData) => {
        // Update the state with incoming data
        AuthState.accessToken = loginResponseData.token;
        AuthState.user = loginResponseData.user;
        AuthState.authStatus = true;
        AuthState.authLoading = true;

        // Pro-tip: Save to localStorage here so user stays logged in on refresh
        localStorage.setItem('token', loginResponseData.token);
    },

    logout: () => {
    },
    checkLogin: () => {
    }
};

 */

//main logic for global state management of authentication

const useAuthStore = create()(persist(

    (set, get) => ({
    authLoading: false,
    accessToken: null,
    user: null,
    authStatus: false,
    login: async (loginResponseData) => {
        set({authLoading: true});
        try {
            const response = await loginUser(loginResponseData)
            set({
                accessToken: response.access_token,
                user: response.user,
                authStatus: true,
            });
            //localStorage.setItem('token', loginResponseData.token);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },
    logout: async () => {
        try {
            set({
                authLoading: false
            })
            await logoutUser();
            toast.success("Logout successful!")
        } catch (error) {}
        finally {
            set({
                authLoading: false
            })
        }
        set({
            accessToken: null,
            user: null,
            authLoading: false,
            authStatus: false,
        });
    },
    checkLogin: () => !!get().accessToken && get().authStatus

}), {name: LOCAL_KEY}));


export default useAuthStore;