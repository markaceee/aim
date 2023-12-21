import http from "../utils/http";



export const fetchAllUsers = async () => {
    return await http
        .get("/users")
        .then(res => res.data)
        .catch(e => { console.log("Fetch user error " + e); throw e; })
}

export const getBalance = async () => {
    return await http
        .get("/balance")
        .then(res => res.data)
        .catch(e => { console.log("Get balance error " + e); throw e })
}

export const applicationForm = async (obj) => {
    return await http
        .post("/non-verified-instructor", obj)
        .then(res => console.log("Email sent"))
        .catch(e => { console.log("application form request error " + e); throw e });
}

export const verifiedApplicationForm = async (token) => {
    return await http
        .get(`/verified-email?token=${token}`)
        .then(res => res.data)
        .catch(e => { console.log("Token expired " + e); throw e; })
}


export const register = async (obj) => {
    try {
        const response = await http.post("/register", obj);
        return response.data;
    } catch (error) {
        console.log("Error requesting register:", error);
        throw error;
    }
};

export const deleteToken = async (token) => {
    try {
        await http.delete(`/delete-token/${token}`);
    } catch (error) {
        console.log("Error deleting token:", error);
        throw error;
    }
};


export const transactionHistory = async (gte, lte) => {
    try {
        const response = await http.get(`/transactions?gte=${gte}&lte=${lte}`);
        return response.data;
    } catch (error) {
        console.log("Error getting transaction history");
        throw error;
    }
}


export const payout = async (data) => {
    try {
        await http.post(`/payout`, data);
    } catch (error) {
        console.log("Error requesting payout");
        throw error;
    }
}