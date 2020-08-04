import API from "../utils/api";

export const galleryService = {
    getAllFiles,
};

async function getAllFiles() {
    const response = await API.get('/user/1/files?pageNo=0&pageSize=10&sortBy=updated',);
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