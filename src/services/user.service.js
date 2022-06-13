import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3001/api/user/";

const getPublicContent = () => {
    return axios.get(API_URL + "allTest");
}

const getUserBoard = () => {
    return axios.get(API_URL + "userTest", { headers: authHeader() });
}

const getAdminBoard = () => {
    return axios.get(API_URL + "adminTest", { headers: authHeader() });
}

const getSuperAdminBoard = () => {
    return axios.get(API_URL + "superAdminTest", { headers: authHeader() });
}

const UserService = {

};

export default UserService;