import httpHeader from "./http-header";

const createFee = (data) => {
    return httpHeader.post("/fee", data);
}

const getAllFees = () => {
    return httpHeader.get("/fee");
}

const getFee = (id) => {
    return httpHeader.get(`/fee/${id}`);
}

const updateFee = (id, data) => {
    return httpHeader.put(`/fee/${id}`, data);
}

const deleteFee = (id) => {
    return httpHeader.delete(`/fee/${id}`);
}

const FeeService = {
    createFee,
    getAllFees,
    getFee,
    updateFee,
    deleteFee
};

export default FeeService;