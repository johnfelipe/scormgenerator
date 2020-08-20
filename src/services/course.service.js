import API from "../utils/api";

export const courseService = {
    getAll,
    addCourse,
};

async function getAll() {
    const response = await API.get('/courses',);
    return handleResponse(response);
}

async function addCourse(data) {
    const response = await API.post('/courses', data);
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