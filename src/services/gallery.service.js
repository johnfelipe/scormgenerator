import API from "../utils/api";

export const galleryService = {
    getAllFiles,
    uploadFiles,
    getFile,
};

async function getAllFiles() {
    const response = await API.get('/user/1/files?pageNo=0&pageSize=1000&sortBy=updated',);
    return handleResponse(response);
}

async function uploadFiles(data) {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const response = await API.post('/uploadFile', data, config);
    return handleResponse(response);
}

async function getFile(id) {
    const response = await API.get('/files/' + id);
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