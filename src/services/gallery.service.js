import API from "../utils/api";

export const galleryService = {
    getAllFiles,
    uploadFiles,
    getFile,
    updateFile,
};

async function getAllFiles() {
    let response;
    try {
        response = await API.get('/user/1/files?pageNo=0&pageSize=1000&sortBy=updated',);
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

async function uploadFiles(data) {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    let response;
    try {
        response = await API.post('/uploadFile', data, config);
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

async function getFile(id) {
    let response;
    try {
        response = await API.get('/files/' + id);
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

async function updateFile(id, vtt, alt) {
    let response;
    try {
        response = await API.put('/files/' + id + '?vtt=' + vtt + '&alt=' + alt,);
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