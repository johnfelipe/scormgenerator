import API from "../utils/api";

export const columnService = {
    createColumn,
    updateColumn,
};

async function createColumn(columnObj) {
    const response = await API.post('/columns', columnObj);
    return handleResponse(response);
}

async function updateColumn(columnObj, id) {
    const response = await API.put('/columns/' + id, columnObj);
    return handleResponse(response);
}

function handleResponse(response) {
    let data = response.data;
    
    if (response.status === 500) {
        const error = response;
        return Promise.reject(error.message);
    }

    return data;
}