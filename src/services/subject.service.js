import httpHeader from "./http-header";

const createSubject = (data) => {
    return httpHeader.post("/subject", data);
}

const getAllSubjects = () => {
    return httpHeader.get("/subject");
}

const getAllSubjectsByTeacher = (data) => {
    return httpHeader.post("/subject/teacher", data);
}

const getSubject = (id) => {
    return httpHeader.get(`/subject/${id}`);
}

const updateSubject = (id, data) => {
    return httpHeader.put(`/subject/${id}`, data);
}

const deleteSubject = (id) => {
    return httpHeader.delete(`/subject/${id}`);
}

const SubjectService = {
    createSubject,
    getAllSubjects,
    getSubject,
    updateSubject,
    deleteSubject,
    getAllSubjectsByTeacher
};

export default SubjectService;