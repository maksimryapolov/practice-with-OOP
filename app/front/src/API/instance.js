import * as axios from "axios";
import {tokenStorage} from "../common/token/token";

export let api = axios.create({
    baseURL: "http://localhost/api",
    withCredentials: true,
});

const inst = axios.create({
    baseURL: "http://localhost/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}, error => {
    console.log(error);
});

api.interceptors.response.use(response => {
    return response;
}, async error => {
    try {
        if(error.response.status === 401) {
            switch(error.response.data.error.code) {
                case 1: // not refresh
                    console.log("Нет refresh токена");
                    return error.response;
                case 2: // not access
                    // Обработка повторного запроса для access
                    // 1. отправить на обновление access token
                    // 2.

                   let res = await inst.post("/user/refresh");

                    if(res.data.TOKEN.ACCESS) {
                       tokenStorage.set({token: res.data.TOKEN.ACCESS});
                       return api.request(error.config);
                   }
            }
        }

        if(error.response.status === 400) {
            return error.response;
        }
    } catch (e) {
        throw console.log(e);
    }

})


