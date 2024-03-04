import axios from "axios"




axios.defaults.baseURL="http://127.0.0.1:8888";
axios.defaults.headers.common["Authorization"]=localStorage.getItem("token") || "";


export const postAPI = async (url, data) => {
    let response = await axios.post(url, data);
    return response;
}


export const getAPI = async (url) => {
    let response = await axios.get(url);
    return response;
}