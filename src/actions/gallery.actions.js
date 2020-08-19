import { galleryConstants } from '../constants';
import { galleryService } from '../services';
import { alertActions } from './';

export const galleryActions = {
    getAllFiles,
    uploadFiles
};

function getAllFiles() {
    return dispatch => {
        dispatch(request());

        galleryService.getAllFiles()
            .then(
                mediaFiles => {
                    dispatch(success(mediaFiles))
                    dispatch(alertActions.success('Getting all files successful!'))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: galleryConstants.GET_ALL_FILES_REQUEST } }
    function success(mediaFiles) { return { type: galleryConstants.GET_ALL_FILES_SUCCESS, mediaFiles } }
    function failure(error) { return { type: galleryConstants.GET_ALL_FILES_ERROR, error } }
}

function uploadFiles(data) {
    return dispatch => {
        dispatch(request(data));

        galleryService.uploadFiles(data)
            .then(
                mediaFiles => {
                    dispatch(this.getAllFiles())
                    dispatch(alertActions.success('File/s uploaded successfully.'))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: galleryConstants.GET_ALL_FILES_REQUEST } }
    function failure(error) { return { type: galleryConstants.GET_ALL_FILES_ERROR, error } }
}
