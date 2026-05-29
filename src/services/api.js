import axios from "axios";

const API = axios.create({
    baseURL: "https://spkbackend-gamma.vercel.app"
});

export default API;