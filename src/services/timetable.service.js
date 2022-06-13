import httpHeader from "./http-header";

const createTimeTable = (data) => {
    return httpHeader.post("/timetable", data);
}

const getAllTimeTables = () => {
    return httpHeader.get("/timetable");
}

const getTimeTable = (id) => {
    return httpHeader.get(`/timetable/${id}`);
}

const updateTimeTable = (id, data) => {
    return httpHeader.put(`/timetable/${id}`, data);
}

const deleteTimeTable = (id) => {
    return httpHeader.delete(`/timetable/${id}`);
}

const TimeTableService = {
    createTimeTable,
    getAllTimeTables,
    getTimeTable,
    updateTimeTable,
    deleteTimeTable
};

export default TimeTableService;