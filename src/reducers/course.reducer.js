import { courseContants } from '../constants';
const initialState = {
    currentCourse: {},
    courses: [],
    courseLessons: [],
}

export function course(state = initialState, action) {
    switch (action.type) {
        case courseContants.REQUEST:
            return {
                ...state,
                loading: true
            };

        case courseContants.CREATE_SUCCESS:
            return {
                ...state,
                currentCourse: action.course,
            };

        case courseContants.GETALL_COURSE_SUCCESS:
            return {
                ...state,
                courses: action.courses,
            };

        case courseContants.GET_COURSE_SUCCESS:
            return {
                ...state,
                currentCourse: action.course,
            };

        case courseContants.GET_COURSE_LESSONS_SUCCESS:
            return {
                ...state,
                courseLessons: action.lessons,
            };

        case courseContants.APPEND:
            const { slideObj, lessonIndex } = action;

            const lessonObj = {
                ...state.courseLessons[lessonIndex]
            };

            lessonObj.slides.push(slideObj);
        
            const lessons = [...state.courseLessons];
            lessons[lessonIndex] = lessonObj;
            
            return {
                ...state,
                courseLessons: lessons,
            };
    
        case courseContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}