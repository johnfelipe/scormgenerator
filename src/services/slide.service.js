import API from "../utils/api";

export const slideService = {
    createSlide,
    getAllSlides,
    getSlide,
    updateSlide,
    getSlideColumns,
};

async function createSlide(slideObj) {
    const response = await API.post('/slides', slideObj);
    return handleResponse(response);
}

async function getAllSlides() {
    const response = await API.get('/slides',);
    return handleResponse(response);
}

async function getSlide(id) {
    const response = await API.get('/slides/' + id,);
    return handleResponse(response);
}

async function updateSlide(data, id) {
    const response = await API.put('/slides/' + id, data);
    return handleResponse(response);
}

async function getSlideColumns(id) {
    const response = await API.get('/slides/' + id + '/columns?pageNo=0&pageSize=10000&sortBy=clid',);
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