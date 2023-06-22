import axios from "../axios";

// const handleLoginApi = (userEmail, userPassword) => {
//     return axios.post("api/login", {
//         email: userEmail,
//         password: userPassword,
//     });
// };

const handleLoginApi = (email, password) => {
    return axios.post("api/login", { email, password });
};

const getAllUsers = (inputId) => {
    //template string ``
    return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
    console.log("check data form service: ", data);
    return axios.post("/api/create-new-user", data);
};
export { handleLoginApi, getAllUsers, createNewUserService };
