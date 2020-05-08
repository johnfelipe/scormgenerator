import * as types from './actions/types';

const initialState ={
    courseTitle: '',
    courseLogo: '',
    resourceFiles: [],
    transcriptFile: {},
    navigationType: '',
    showProgressbar: '',
    lessons: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_COURSE_TITLE:
            return {
                ...state,
                courseTitle: action.value,
            }
        case types.ADD_COURSE_LOGO:
            return {
                ...state,
                courseLogo: action.value,
            }
        default:
            return state;
    }
}

export default reducer;
