import axios from "axios"




axios.defaults.baseURL="http://127.0.0.1:8888";
axios.defaults.headers.common["Authorization"]=localStorage.getItem("token") || "";


export const postAPI = async (url, data) => {
    try{
        let response = await axios.post(url, data);
        return response;
    }catch(e){
        console.log("Error: ", e);
        return {status: 500, data: {message: "Internal server error"}};
    }
}


export const getAPI = async (url) => {
    try{
        let response = await axios.get(url);
        return response;
    }catch(e){
        console.log("Error: ", e);
        return {status: 500, data: {message: "Internal server error"}};
    }
}