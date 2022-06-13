import httpHeader from "./http-header";

const createTeacher = (data) => {
    return httpHeader.post("/teacher", data);
}

const linkUser = (data) => {
    return httpHeader.post("/teacher/linkuser", data);
}

const getTeacherByUserId = (data) => {
    return httpHeader.post('/teacher/getbyuserid', data);
}

const getAllTeachers = () => {
    return httpHeader.get("/teacher");
}

const getTeacher = (id) => {
    return httpHeader.get(`/teacher/${id}`);
}

const updateTeacher = (id, data) => {
    return httpHeader.put(`/teacher/${id}`, data);
}

const deleteTeacher = (id) => {
    return httpHeader.delete(`/teacher/${id}`);
}

const TeacherService = {
    createTeacher,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher,
    linkUser,
    getTeacherByUserId
};

export default TeacherService;