import { galleryConstants } from '../constants';

export function gallery(state = {}, action) {
    switch (action.type) {
        case galleryConstants.GET_ALL_FILES_SUCCESS:
            return {
                mediaFiles: action.mediaFiles
            };
        case galleryConstants.GET_ALL_FILES_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}