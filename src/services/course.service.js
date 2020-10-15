import API from "../utils/api";

export const courseService = {
    getAll,
    createCourse,
    getCourse,
    getCourseLessons,
    updateCourse,
    duplicateCourse,
    checkApi,
};

async function getAll() {
    let response;
    try {
        response = await API.get('/courses',);
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

async function createCourse(data) {
    let response;
    try {
        response = await API.post('/courses', data);
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

async function getCourse(id) {
    let response;
    try {
        response = await API.get('/courses/' + id);
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

async function getCourseLessons(id) {
    let response;
    try {
        response = await API.get('/course/' + id + '/lessons?pageNo=0&pageSize=1000&sortBy=weight');
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

async function updateCourse(data, id) {
    let response;
    try {
        response = await API.put('/courses/' + id, data);
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

async function duplicateCourse(id) {
    let response;
    try {
        response = await API.post('/copy/courses/' + id,);
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

async function checkApi() {
    let response;
    try {
        response = await API.get('/courses',);
    } catch (error) {
        response = {
            data: [],
            status: 404,
            message: 'Not found',
            error: error,
        };
    }
    return handleApiResponseChecker(response);
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

function handleApiResponseChecker(response) {
    let data = response.data;
    
    if (response.status === 500) {
        const error = response;
        return Promise.reject(error.message);
    } else if (response.status === 404) {
        return response
        // return Promise.reject(error.message);
    }

    return data;
}