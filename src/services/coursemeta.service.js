import API from "../utils/api";

export const coursemetaService = {
    createCoursemeta,
    updateCoursemeta,
    deleteCoursemeta,
    getAllCoursemeta,
    getCoursemeta,
    getCoursemetaByRkey,
    duplicateCoursemeta,
};

async function createCoursemeta(coursemetaObj) {
    let response;
    try {
        response = await API.post('/coursesmeta', coursemetaObj);
    } catch (error) {
        response = {
            data: [],
            status: 404,
            message: 'Not found',
        };
    }
    return handleResponse(response);
}

async function updateCoursemeta(coursemetaObj, id) {
    let response;
    try {
        response = await API.put('/coursesmeta/' + id, coursemetaObj);
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

async function deleteCoursemeta(id) {
    let response = '';
    try {
        response = await API.delete('/coursesmeta/' + id,);
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

async function getAllCoursemeta() {
    let response;
    try {
        response = await API.get('/coursesmeta',);
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

async function getCoursemeta(id) {
    let response;
    try {
        response = await API.get('/coursesmeta/' + id,);
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

async function getCoursemetaByRkey(cid, rkey) {
    let response;
    try {
        response = await API.get('/course/' + cid + '/coursemeta/rkey/' + rkey,);
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

async function duplicateCoursemeta(id) {
    let response = '';
    try {
        response = await API.post('/copy/coursesmeta/' + id,);
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