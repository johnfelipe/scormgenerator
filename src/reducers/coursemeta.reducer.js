import { coursemetaConstants } from '../constants';
const initialState = {
    currentCoursemeta: {},
    coursemetas: [],
    coursemetasResources: [],
    coursemetasTranscript: [],
    coursemetasGlossary: [],
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
            if (action.rkey === "resources") {
                return {
                    ...state,
                    coursemetasResources: action.coursemetas
                };
            } else if (action.rkey === "transcript") {
                return {
                    ...state,
                    coursemetasTranscript: action.coursemetas
                };
            } else if (action.rkey === "glossary") {
                return {
                    ...state,
                    coursemetasGlossary: action.coursemetas
                };
            } else {
                return {
                    ...state,
                    coursemetasByRkey: action.coursemetas
                };
            };

        case coursemetaConstants.GET_COURSEMETA_SUCCESS:
            return {
                ...state,
                currentCoursemeta: action.coursemeta
            };
            
        case coursemetaConstants.UPDATE_SUCCESS:
            return {
                ...state,
                message: 'message: ' + action.message + ' cmid: ' + action.id
            };

        case coursemetaConstants.DELETE_SUCCESS:
            return {
                ...state,
                message: 'message: ' + action.message + ' cmid: ' + action.id
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