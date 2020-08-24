import API from "../utils/api";

export const lessonService = {
    createLesson,
    getAllLessons,
    getLesson,
    updateLesson,
    getLessonSlides,
};

async function createLesson(lessonObj) {
    const response = await API.post('/lessons', lessonObj);
    return handleResponse(response);
}

async function getAllLessons() {
    const response = await API.get('/lessons',);
    return handleResponse(response);
}

async function getLesson(id) {
    const response = await API.get('/lessons/' + id,);
    return handleResponse(response);
}

async function updateLesson(id) {
    const response = await API.put('/lessons/' + id,);
    return handleResponse(response);
}

async function getLessonSlides(id) {
    const response = await API.get('/lessons/' + id + '/slides?pageNo=0&pageSize=10000&sortBy=sid',);
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