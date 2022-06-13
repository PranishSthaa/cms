import httpHeader from "./http-header";

const createAttendance = (data) => {
    return httpHeader.post("/attendance", data);
}

const getAttendanceByDateAndSubject = (data) => {
    return httpHeader.post("/attendance/getbydateandsubject", data);
}

const getAllAttendances = () => {
    return httpHeader.get("/attendance");
}

const getAttendance = (id) => {
    return httpHeader.get(`/attendance/${id}`);
}

const updateAttendance = (id, data) => {
    return httpHeader.put(`/attendance/${id}`, data);
}

const deleteAttendance = (id) => {
    return httpHeader.delete(`/attendance/${id}`);
}

const AttendanceService = {
    createAttendance,
    getAllAttendances,
    getAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendanceByDateAndSubject
};

export default AttendanceService;