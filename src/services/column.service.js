import API from "../utils/api";

export const columnService = {
    createColumn,
    updateColumn,
    deleteColumn,
    getAllColumn,
};

async function createColumn(columnObj) {
    let response;
    try {
        response = await API.post('/columns', columnObj);
    } catch (error) {
        response = {
            data: [],
            status: 404,
            message: 'Not found',
            error: error,
        };
    }
    return handleResponse(response);
}

async function updateColumn(columnObj, id) {
    let response;
    try {
        response = await API.put('/columns/' + id, columnObj);
    } catch (error) {
        response = {
            data: [],
            status: 404,
            message: 'Not found',
            error: error,
        };
    }
    return handleResponse(response);
}

async function deleteColumn(id) {
    let response;
    try {
        response = await API.delete('/columns/' + id,);
    } catch (error) {
        response = {
            data: [],
            status: 404,
            message: 'Not found',
            error: error,
        };
    }
    return handleResponse(response);
}

async function getAllColumn() {
    let response;
    try {
        response = await API.get('/columns',);
    } catch (error) {
        response = {
            data: [],
            status: 404,
            message: 'Not found',
            error: error,
        };
    }
    return handleResponse(response);
}

function handleResponse(response) {
    let data = response.data;
    
    if (response.status === 500) {
        const error = response;
        return Promise.reject(error.message);
    } else if (response.status === 404) {
        const error = response;
        console.log(error.message);
        console.log(error.error);
        // return Promise.reject(error.message);
    }

    return data;
}