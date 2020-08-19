import API from "../utils/api";

export const courseService = {
    createCourse,
    getAllCourse,
    getCourseById,
};

async function createCourse(courseObj) {
    const response = await API.post('/courses', courseObj);
    return handleResponse(response);
}

async function getAllCourse() {
    const response = await API.get('/courses',);
    return handleResponse(response);
}

async function getCourseById(id) {
    const response = await API.get('/courses/' + id,);
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