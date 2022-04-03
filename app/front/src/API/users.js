import * as axios from "axios";
import {api} from "./instance";

/*
let instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

const users = {
    getUsers(limit, current) {
        return instance
            .get(`users?_limit=${limit}&_page=${current}`)
            .then((res) => {
                return {
                    data: res.data,
                    countRecords: parseInt(res.headers["x-total-count"]),
                };
            });
    },
};
*/

const users = {
    getUsers() {
        return api.post('/users').then(response => {
            if(response.status === 200) {
                return response.data;
            }
        })
    }
}

export default users;
