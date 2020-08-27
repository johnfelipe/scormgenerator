import { courseContants } from '../constants';
const initialState = {
    currentCourse: {},
    courses: [],
    courseLessons: [],
}

export function course(state = initialState, action) {
    let lessons = [];

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

            const appendToLessonObj = {
                ...state.courseLessons[lessonIndex]
            };

            appendToLessonObj.slides.push(slideObj);
        
            lessons = [...state.courseLessons];
            lessons[lessonIndex] = appendToLessonObj;
            
            return {
                ...state,
                courseLessons: lessons,
            };

        case courseContants.DELETE_SLIDE_FROM_COURSE_LESSON:
            const deleteFromLessonObj = {
                ...state.courseLessons[action.lessonIndex]
            };

            deleteFromLessonObj.slides.splice(action.slideIndex, 1);
        
            lessons = [...state.courseLessons];
            lessons[action.lessonIndex] = deleteFromLessonObj;
        
            return {
                ...state,
                courseLessons: lessons,
            }

        case courseContants.UPDATE_SLIDE_FROM_COURSE_LESSON:
            const updateFromLessonObj = {
                ...state.courseLessons[action.lessonIndex]
            };

            updateFromLessonObj.slides[action.slideIndex].title = action.slideObj.title;
            updateFromLessonObj.slides[action.subtitle].hide_title = action.slideObj.subtitle;
            updateFromLessonObj.slides[action.slideIndex].hide_title = action.slideObj.hide_title;
        
            lessons = [...state.courseLessons];
            lessons[action.lessonIndex] = updateFromLessonObj;
        
            return {
                ...state,
                courseLessons: lessons,
            }
    
        case courseContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}