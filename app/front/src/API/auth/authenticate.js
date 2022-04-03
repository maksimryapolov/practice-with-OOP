import {api} from "../instance";
import {tokenStorage} from "../../common/token/token";

const authenticate = {
    auth(login, password) {
        return api
            .post("/user/login", {
                LOGIN: login,
                PASSWORD: password,
                SUBMIT: "send",
            }).then((response) => {
                if (response.status === 200) {
                    // TODO: Продумать более логичное место для сохранения
                    tokenStorage.set({key: "token", token: response.data.TOKEN.ACCESS});
                    return response.data;
                }
            });
    },

    check() {
        return api
            .post("/user/refresh", {})
            .then(response => {
                if (response.status === 200) {
                    tokenStorage.set({key: "token", token: response.data.TOKEN.ACCESS});
                    return response.data;
                }
            }
        );
    },

    register: (login, email, password) => {
        return api.post("/user/register", {
            LOGIN: login,
            EMAIL: email,
            PASSWORD: password,
            SUBMIT: "send"
        }).then(response => {
            if(response.status === 200) {
               return response.data;
            }
        });
    },

    logout: () => {
        return api.post("/user/logout").then(response => {
            if (response.status === 200) {
                tokenStorage.remove("token");
                return response.data;
            }
        });
    }
};

export default authenticate;
