import httpHeader from "./http-header";

const createFaculty = (data) => {
    return httpHeader.post("/faculty", data);
}

const getAllFaculties = () => {
    return httpHeader.get("/faculty");
}

const getFaculty = (id) => {
    return httpHeader.get(`/faculty/${id}`);
}

const updateFaculty = (id, data) => {
    return httpHeader.put(`/faculty/${id}`, data);
}

const deleteFaculty = (id) => {
    return httpHeader.delete(`/faculty/${id}`);
}

const FacultyService = {
    createFaculty,
    getAllFaculties,
    getFaculty,
    updateFaculty,
    deleteFaculty
};

export default FacultyService;