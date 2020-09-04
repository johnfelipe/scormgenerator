import { galleryConstants } from '../constants';
import { galleryService } from '../services';
// import { alertActions } from './';
// import { history } from '../helpers';

export const galleryActions = {
    getAllFiles,
    uploadFiles,
    getFile,
    updateFile,
};

function getAllFiles() {
    return dispatch => {
        dispatch(request());

        galleryService.getAllFiles()
            .then(
                files => { 
                    dispatch(success(files));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(files) { return { type: galleryConstants.REQUEST, files } }
    function success(files) { return { type: galleryConstants.GETALL_FILES_SUCCESS, files } }
    function failure(error) { return { type: galleryConstants.ERROR, error } }
}

function uploadFiles(data) {
    return dispatch => {
        dispatch(request(data));

        galleryService.uploadFiles(data)
            .then(
                file => { 
                    dispatch(success(file));
                    // dispatch(alertActions.success('File uploaded successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(file) { return { type: galleryConstants.REQUEST, file } }
    function success(file) { return { type: galleryConstants.UPLOAD_SUCCESS, file } }
    function failure(error) { return { type: galleryConstants.ERROR, error } }
}

function getFile(id) {
    return dispatch => {
        dispatch(request(id));

        galleryService.getFile(id)
            .then(
                file => { 
                    dispatch(success(file));
                    // dispatch(alertActions.success('File fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: galleryConstants.REQUEST, id } }
    function success(file) { return { type: galleryConstants.GET_FILE_SUCCESS, file } }
    function failure(error) { return { type: galleryConstants.ERROR, error } }
}

function updateFile(id, vtt, alt) {
    return dispatch => {
        dispatch(request(vtt));

        galleryService.updateFile(id, vtt, alt)
            .then(
                file => { 
                    dispatch(success(file));
                    // dispatch(alertActions.success('File fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: galleryConstants.REQUEST, id } }
    function success(file) { return { type: galleryConstants.UPDATE_SUCCESS, file } }
    function failure(error) { return { type: galleryConstants.ERROR, error } }
}
