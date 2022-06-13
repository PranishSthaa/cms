import httpHeader from "./http-header";

const createDepartment = (data) => {
    return httpHeader.post("/department", data);
}

const getAllDepartments = () => {
    return httpHeader.get("/department");
}

const getDepartment = (id) => {
    return httpHeader.get(`/department/${id}`);
}

const updateDepartment = (id, data) => {
    return httpHeader.put(`/department/${id}`, data);
}

const deleteDepartment = (id) => {
    return httpHeader.delete(`/department/${id}`);
}

const DepartmentService = {
    createDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment
};

export default DepartmentService;