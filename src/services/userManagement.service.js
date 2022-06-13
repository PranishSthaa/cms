import httpHeader from "./http-header";

const createUser = (data) => {
    return httpHeader.post("/usermanagement", data);
}

const getAllUsers = () => {
    return httpHeader.get("/usermanagement");
}

const getUser = (id) => {
    return httpHeader.get(`/usermanagement/${id}`);
}

const updateUser = (id, data) => {
    return httpHeader.put(`/usermanagement/${id}`, data);
}

const changePassword = (data) => {
    return httpHeader.put(`/user/changepass`, data);
}

const deleteUser = (id) => {
    return httpHeader.delete(`/usermanagement/${id}`);
}

const UserManagementService = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    changePassword
};

export default UserManagementService;