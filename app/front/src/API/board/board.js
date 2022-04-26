import {api} from "../instance";

export const board = {
    getFields: async () => {
        const {data} = await api.post("/boards/get-field-list");
        return data;
    },

    addNewRecord: async (params) => {
        const { data } = await api.post("/boards/set-record", { name: params.value,  segment: params.segment });
        return data;
    }
}