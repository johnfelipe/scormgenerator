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
        case 'UPDATE_COURSE_TITLE':
            return {
                ...state,
                courseTitle: action.value,
            }
        case 'UPDATE_COURSE_LOGO':
            return {
                ...state,
                courseLogo: action.value,
            }
        default:
            return state;
    }
}

export default reducer;
