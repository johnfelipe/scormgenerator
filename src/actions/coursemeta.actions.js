import { coursemetaConstants } from '../constants';
import { coursemetaService } from '../services';
// import { alertActions } from './';
// import { history } from '../helpers';

export const coursemetaActions = {
    createCoursemeta,
    updateCoursemeta,
    deleteCoursemeta,
    getAllCoursemeta,
    getCoursemeta,
    getCoursemetaByRkey,
};

function createCoursemeta(data) {
    return dispatch => {
        dispatch(request(data));

        coursemetaService.createCoursemeta(data)
            .then(
                coursemeta => { 
                    dispatch(success(coursemeta));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(coursemeta) { return { type: coursemetaConstants.REQUEST, coursemeta } }
    function success(coursemeta) { return { type: coursemetaConstants.CREATE_SUCCESS, coursemeta } }
    function failure(error) { return { type: coursemetaConstants.ERROR, error } }
}

function updateCoursemeta(data, id) {
    return dispatch => {
        dispatch(request(data));

        coursemetaService.updateCoursemeta(data, id)
            .then(
                message => { 
                    dispatch(success(message, id));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(message) { return { type: coursemetaConstants.REQUEST, message } }
    function success(message, id) { return { type: coursemetaConstants.UPDATE_SUCCESS, message, id } }
    function failure(error) { return { type: coursemetaConstants.ERROR, error } }
}

function deleteCoursemeta(id) {
    return dispatch => {
        dispatch(request(id));

        coursemetaService.deleteCoursemeta(id)
            .then(
                message => { 
                    dispatch(success(message));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(message) { return { type: coursemetaConstants.REQUEST, message } }
    function success(message) { return { type: coursemetaConstants.DELETE_SUCCESS, message } }
    function failure(error) { return { type: coursemetaConstants.ERROR, error } }
}

function getAllCoursemeta() {
    return dispatch => {

        coursemetaService.getAllCoursemeta()
            .then(
                coursemetas => { 
                    dispatch(success(coursemetas));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };
    
    function success(coursemetas) { return { type: coursemetaConstants.GETALL_COURSEMETAS_SUCCESS, coursemetas } }
    function failure(error) { return { type: coursemetaConstants.ERROR, error } }
}

function getCoursemeta(id) {
    return dispatch => {
        dispatch(request(id));

        coursemetaService.getCoursemeta(id)
            .then(
                coursemeta => { 
                    dispatch(success(coursemeta));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(coursemeta) { return { type: coursemetaConstants.REQUEST, coursemeta } }
    function success(coursemeta) { return { type: coursemetaConstants.GET_COURSEMETA_SUCCESS, coursemeta } }
    function failure(error) { return { type: coursemetaConstants.ERROR, error } }
}

function getCoursemetaByRkey(cid, rkey) {
    return dispatch => {
        dispatch(request(rkey));

        coursemetaService.getCoursemetaByRkey(cid, rkey)
            .then(
                coursemetas => { 
                    dispatch(success(coursemetas, rkey));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(coursemetas) { return { type: coursemetaConstants.REQUEST, coursemetas } }
    function success(coursemetas, rkey) { return { type: coursemetaConstants.GETALL_COURSEMETAS_RKEY_SUCCESS, coursemetas, rkey } }
    function failure(error) { return { type: coursemetaConstants.ERROR, error } }
}
