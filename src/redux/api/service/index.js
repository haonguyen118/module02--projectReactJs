import axios from "axios";



const baseURL = import.meta.env.VITE_BASE_URL;

console.log("baseURL",baseURL);

 export const jsonAxios= axios.create({
    baseURL,
    headers:{
        "Content-Type": "application/json",
},
});