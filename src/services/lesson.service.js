import API from "../utils/api";

export const lessonService = {
    createLesson,
    getAllLessons,
};

async function createLesson(lessonObj) {
    const response = await API.post('/lessons', lessonObj);
    return handleResponse(response);
}

async function getAllLessons() {
    const response = await API.get('/lessons',);
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