import * as axios from "axios";

export let api = axios.create({
    baseURL: "http://localhost/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
}, error => {
    console.log(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    try {
        if(error.response.status === 401) {
            switch(error.response.data.error.code) {
                case 1: // not refresh
                    console.log("Нет refresh токена");
                    return error.response;
                case 2: // not access
                    break;
            }
            // return api.request(error.config);
        }

        if(error.response.status === 400) {
            return error.response;
        }
    } catch (e) {
        throw console.log(e);
    }

})


