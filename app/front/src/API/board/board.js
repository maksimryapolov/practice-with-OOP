import {api} from "../instance";

export const board = {
    addBoard: async (params) => {
        const data = await api.post("/boards/add",
            {
                date: params.date,
                time: params.time,
                amount: params.amount,
                recordType: params.recordType,
                account: params.account,
                category: params.category
            }
        );

        return  data.data.result;
    },

    getFields: async () => {
        const {data} = await api.post("/boards/get-field-list");
        return data;
    },

    addNewRecord: async (params) => {
        const { data } = await api.post("/boards/record/processing", { name: params.value,  segment: params.segment, typeId: params.typeId});
        return data;
    },

    updateRecord: async (params) => {
        const { data } = await api.put(
            "/boards/record/processing",
            {
                name: params.value,
                segment: params.segment,
                id: params.id,
                typeId: params.typeId
            }
        );
        return data;
    },

    deleteRecord: async (params) => {
        const { data } = await api.delete("/boards/record/processing", { data: {segment: params.segment, id: params.id }});
        return data;
    },

    getCards: async params => {
        const {data} = await api.post("/boards/get", params);
        return data;
    },

    getTypes: async () => {
        const {data} = await api.post("/boards/get-types-action");
        return data;
    }
}