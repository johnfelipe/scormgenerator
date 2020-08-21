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
                loading: true
            };

        case courseContants.CREATE_SUCCESS:
            return {
                currentCourse: action.course
            };

        case courseContants.GETALL_COURSE_SUCCESS:
            return {
                courses: action.courses
            };

        case courseContants.GET_COURSE_SUCCESS:
            return {
                currentCourse: action.course
            };

        case courseContants.GET_COURSE_LESSONS_SUCCESS:
            return {
                courseLessons: action.lessons
            };
    
        case courseContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}