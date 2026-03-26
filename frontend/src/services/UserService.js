import axios from "axios";
import apiClient from "./ApiClient.js";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/public"


export const listUsers = () => {
    return apiClient.get("/users")
}

export const registerUser = async (user) => await apiClient.post("/auth/register", user)
export const loginUser = async (user) => {
    const response = await apiClient.post("/auth/authenticate", user)
    return response.data
}
export const logoutUser = () => apiClient.post("/auth/logout")
export const findUser = async (userId) => {
    await apiClient.get(`/users/byId/${userId}`)
}
export const findUserByUsername = async (username) => {
    return apiClient.get(`/byUsername/${username}`)
}

export const publicUserPage = async (username) => {
    return axios.get(`${REST_API_BASE_URL}/user/${username}`)
}

export const findUserByEmail = (username) => {
    return apiClient().get(`/users/byEmail/${username}`)
}

export const updateUser = (userId, user) => axios.put(`/users/update/${userId}`, user)
export const deleteUser = (userId) => axios.delete(`/users/delete/${userId}`)