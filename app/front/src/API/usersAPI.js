import * as axios from "axios";

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

export default users;
