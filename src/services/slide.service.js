import API from "../utils/api";

export const slideService = {
    createSlide,
    getAllSlides,
    getSlide,
    updateSlide,
    getSlideColumns,
    deleteSlide,
};

async function createSlide(slideObj) {
    let response;
    try {
        response = await API.post('/slides', slideObj);
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

async function getAllSlides() {
    let response;
    try {
        response = await API.get('/slides',);
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

async function getSlide(id) {
    let response;
    try {
        response = await API.get('/slides/' + id,);
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

async function updateSlide(data, id) {
    let response;
    try {
        response = await API.put('/slides/' + id, data);
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

async function getSlideColumns(id) {
    let response;
    try {
        response = await API.get('/slides/' + id + '/columns?pageNo=0&pageSize=10000&sortBy=clid',);
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

async function deleteSlide(id) {
    let response;
    try {
        response = await API.delete('/slides/' + id,);
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