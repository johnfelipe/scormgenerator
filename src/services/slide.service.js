import API from "../utils/api";

export const slideService = {
    createSlide,
};

async function createSlide(slideObj) {
    const response = await API.post('/slides', slideObj);
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