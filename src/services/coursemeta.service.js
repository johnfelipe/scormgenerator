import API from "../utils/api";

export const coursemetaService = {
    createCoursemeta,
    updateCoursemeta,
    deleteCoursemeta,
    getAllCoursemeta,
    getCoursemeta,
    getCoursemetaByRkey,
};

async function createCoursemeta(coursemetaObj) {
    const response = await API.post('/coursesmeta', coursemetaObj);
    return handleResponse(response);
}

async function updateCoursemeta(coursemetaObj, id) {
    const response = await API.put('/coursesmeta/' + id, coursemetaObj);
    return handleResponse(response);
}

async function deleteCoursemeta(id) {
    let response = '';
    try {
        response = await API.delete('/coursesmeta/' + id,);
    } catch (error) {
        console.log(error);
        response = {
            data: 'Something went wrong.',
        };
    }

    return handleResponse(response);
}

async function getAllCoursemeta() {
    const response = await API.get('/coursesmeta',);
    return handleResponse(response);
}

async function getCoursemeta(id) {
    const response = await API.get('/coursesmeta/' + id,);
    return handleResponse(response);
}

async function getCoursemetaByRkey(cid, rkey) {
    let response = '';
    try {
        response = await API.get('/course/' + cid + '/coursemeta/rkey/' + rkey,);
    } catch (error) {
        console.log(error);
        response = {
            data: [],
        };
    }
    
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