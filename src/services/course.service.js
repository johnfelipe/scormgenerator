import API from "../utils/api";

export const courseService = {
    getAll,
    createCourse,
    getCourse,
    getCourseLessons,
};

async function getAll() {
    const response = await API.get('/courses',);
    return handleResponse(response);
}

async function createCourse(data) {
    const response = await API.post('/courses', data);
    return handleResponse(response);
}

async function getCourse(id) {
    const response = await API.get('/courses/' + id);
    return handleResponse(response);
}

async function getCourseLessons(id) {
    const response = await API.get('/course/' + id + '/lessons?pageNo=0&pageSize=1000&sortBy=lid');
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