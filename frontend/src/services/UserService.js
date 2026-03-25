import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/users/"
const REST_API_AUTH_URL = "http://localhost:8080/api/v1/auth/"


export const listUsers = () => {
    return axios.get(REST_API_BASE_URL)
}

export const registerUser = (user) => axios.post(`${REST_API_AUTH_URL}register`, user)
export const loginUser = (user) => axios.post(`${REST_API_AUTH_URL}authenticate`, user)
export const logoutUser = () => axios.post(`${REST_API_AUTH_URL}logout`)
export const findUser = (userId) => {
    return axios.get(`${REST_API_BASE_URL}byId/${userId}`)
}
export const findUserByUsername = (username) => {
    return axios.get(`${REST_API_BASE_URL}byUsername/${username}`)

}

export const findUserByEmail = (username) => {
    return axios.get(`${REST_API_BASE_URL}byUsername/${username}`)
}

export const updateUser = (userId, user) => axios.put(`${REST_API_BASE_URL}update/${userId}`, user)
export const deleteUser = (userId) => axios.delete(`${REST_API_BASE_URL}delete/${userId}`)