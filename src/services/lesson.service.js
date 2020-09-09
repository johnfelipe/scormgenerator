import API from "../utils/api";

export const lessonService = {
    createLesson,
    getAllLessons,
    getLesson,
    updateLesson,
    getLessonSlides,
    deleteLesson,
    duplicateLesson,
};

async function createLesson(lessonObj) {
    let response;
    try {
        response = await API.post('/lessons', lessonObj);
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

async function getAllLessons() {
    let response;
    try {
        response = await API.get('/lessons',);
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

async function getLesson(id) {
    let response;
    try {
        response = await API.get('/lessons/' + id,);
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

async function updateLesson(data, id) {
    let response;
    try {
        response = await API.put('/lessons/' + id, data);
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

async function getLessonSlides(id) {
    let response;
    try {
        response = await API.get('/lessons/' + id + '/slides?pageNo=0&pageSize=10000&sortBy=weight',);
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

async function deleteLesson(id) {
    let response;
    try {
        response = await API.delete('/lessons/' + id,);
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

async function duplicateLesson(id) {
    let response;
    try {
        response = await API.post('/copy/lessons/' + id,);
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