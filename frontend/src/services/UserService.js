import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users/"

export const listUsers = () => {
    return axios.get(REST_API_BASE_URL)
}

export const createUser = (user) => axios.post(`${REST_API_BASE_URL}register`, user)
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