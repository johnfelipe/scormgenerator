import { coursemetaConstants } from '../constants';
const initialState = {
    currentCoursemeta: {},
    coursemetas: [],
    coursemetasByRkey: [],
}

export function coursemeta(state = initialState, action) {
    switch (action.type) {
        case coursemetaConstants.REQUEST:
            return {
                ...state,
                loading: true
            };

        case coursemetaConstants.CREATE_SUCCESS:
            return {
                ...state,
                currentCoursemeta: action.coursemeta
            };

        case coursemetaConstants.GETALL_COURSEMETAS_SUCCESS:
            return {
                ...state,
                coursemetas: action.coursemetas
            };

        case coursemetaConstants.GETALL_COURSEMETAS_RKEY_SUCCESS:
            return {
                ...state,
                coursemetasByRkey: action.coursemetas
            };

        case coursemetaConstants.GET_COURSEMETA_SUCCESS:
            return {
                ...state,
                currentCoursemeta: action.coursemeta
            };

        case coursemetaConstants.DELETE_SUCCESS:
            return {
                ...state,
                message: action.message
            };
    
        case coursemetaConstants.ERROR:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }
}