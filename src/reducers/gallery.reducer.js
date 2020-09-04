import { galleryConstants } from '../constants';
const initialState = {
    currentFile: {},
    mediaFiles: [],
}

export function gallery(state = initialState, action) {
    switch (action.type) {
        case galleryConstants.REQUEST:
            return {
                ...state,
                loading: true
            };

        case galleryConstants.GETALL_FILES_SUCCESS:
            return {
                ...state,
                mediaFiles: action.files
            };

        case galleryConstants.UPLOAD_SUCCESS:
            return {
                ...state,
                currentFile: action.file
            };

        case galleryConstants.GET_FILE_SUCCESS:
            return {
                ...state,
                currentFile: action.file
            };

        case galleryConstants.UPDATE_SUCCESS:
            return {
                ...state,
                message: action.file
            };
    
        case galleryConstants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}