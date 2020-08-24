import { lessonContants } from '../constants';
const initialState = {
    currentLesson: {},
    lessons: [],
    lessonSlides: [],
}

export function lesson(state = initialState, action) {
    switch (action.type) {
        case lessonContants.REQUEST:
            return {
                loading: true
            };

        case lessonContants.CREATE_SUCCESS:
            return {
                ...state,
                currentLesson: action.course
            };

        case lessonContants.GETALL_LESSON_SUCCESS:
            return {
                ...state,
                lessons: action.courses
            };

        case lessonContants.GET_LESSON_SUCCESS:
            return {
                ...state,
                currentLesson: action.course
            };

        case lessonContants.GET_LESSON_SLIDES_SUCCESS:
            const { loading, ...stateCopy } = state;

            return {
                ...stateCopy,
                lessonSlides: action.lessons
            };
    
        case lessonContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}