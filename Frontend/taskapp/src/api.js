import axios from "axios";

const API=axios.create({
    baseURL: "https://task-manager-backend-p0ad.onrender.com"
});

API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token");
    if(token){
        req.headers.Authorization=token;
    }
    return req;
});

export default API;
