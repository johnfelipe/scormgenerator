import * as types from './actions/types';

const initialState ={
    courseTitle: '',
    courseLogo: '',
    resourceFiles: [],
    transcriptFile: {},
    navigationType: '',
    showProgressbar: '',
    courseLessons: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_COURSE_TITLE:
            return {
                ...state,
                courseTitle: action.courseTitle,
            }
        case types.ADD_COURSE_LOGO:
            return {
                ...state,
                courseLogo: action.courseLogo,
            }
        case types.ADD_COURSE_LESSONS:
            const lessonObj = {'lessonName': action.lessonName};

            return {
                ...state,
                courseLessons: [...state.courseLessons, lessonObj],
            }
        case types.EDIT_COURSE_LESSON_NAME:
            const lessonObject = {
                ...state.courseLessons[action.index]
            };
            lessonObject.lessonName = action.lessonName;
    
            const lessons = [...state.courseLessons];
            lessons[action.index] = lessonObject;

            return {
                ...state,
                courseLessons: lessons,
            }
        case types.DELETE_LESSON:
            const lessonArray = [...state.courseLessons];
            lessonArray.splice(action.index, 1);

            return {
                ...state,
                courseLessons: lessonArray,
            }
        default:
            return state;
    }
}

export default reducer;
