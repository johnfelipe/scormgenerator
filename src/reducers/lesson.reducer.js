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
                ...state,
                loading: true
            };

        case lessonContants.CREATE_SUCCESS:
            return {
                ...state,
                currentLesson: action.lesson
            };

        case lessonContants.GETALL_LESSON_SUCCESS:
            return {
                ...state,
                lessons: action.lessons
            };

        case lessonContants.GET_LESSON_SUCCESS:
            return {
                ...state,
                currentLesson: action.lesson
            };

        case lessonContants.GET_LESSON_SLIDES_SUCCESS:
            return {
                ...state,
                lessonSlides: action.slides
            };

        case lessonContants.UPDATE_SUCCESS:
            return {
                ...state,
                message: 'Message: ' + action.lesson + ' LessonId: ' + action.lid +  + ' LessonTitle: ' + action.title
            };

        case lessonContants.DELETE:
            return {
                ...state,
                message: action.lesson
            };

        case lessonContants.DUPLICATE_LESSON:
            return {
                ...state,
                currentLesson: action.lesson
            };

        case lessonContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}