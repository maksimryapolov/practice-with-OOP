import {api} from "../instance";

export const board = {
    getFields: async () => {
        const {data} = await api.post("/boards/get-field-list");
        return data;
    },

    addNewRecord: async (params) => {
        const { data } = await api.post("/boards/record/processing", { name: params.value,  segment: params.segment });
        return data;
    },

    updateRecord: async (params) => {
        console.log(params);
        const { data } = await api.put("/boards/record/processing", { name: params.value,  segment: params.segment, id: params.id });
        return data;
    }
}