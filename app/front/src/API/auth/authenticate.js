import {api} from "./instance";
import axios from "axios";

const authenticate = {
    auth(login, password) {
        return api
            .post("/user/login", {
                LOGIN: login,
                PASSWORD: password,
                SUBMIT: "send",
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    // TODO: Продумать более логичное место для сохранения
                    this.setTokenInlocal(response.data.TOKEN.ACCESS);
                    return response.data;
                }
            });
    },

    check() {
        return api
            .post("/user/refresh", {})
            .then(response => {
                if (response.status === 200) {
                    this.setTokenInlocal(response.data.TOKEN.ACCESS);
                    return response.data;
                }
            }
        );
    },

    logout: () => {
        return api.post("/user/logout").then(response => {
            if (response.status === 200) {
                localStorage.removeItem("token");
                return response.data;
            }
        });
    },

    setTokenInlocal(token) {
        localStorage.setItem("token", token);
    },
};

export default authenticate;
