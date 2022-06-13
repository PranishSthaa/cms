import httpHeader from "./http-header";

const createStudent = (data) => {
    return httpHeader.post("/student", data);
}

const getAllStudents = () => {
    return httpHeader.get("/student");
}

const getStudent = (id) => {
    return httpHeader.get(`/student/${id}`);
}

const updateStudent = (id, data) => {
    return httpHeader.put(`/student/${id}`, data);
}

const deleteStudent = (id) => {
    return httpHeader.delete(`/student/${id}`);
}

const StudentService = {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
};

export default StudentService;