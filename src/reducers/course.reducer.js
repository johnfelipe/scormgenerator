import { courseContants } from '../constants';
const initialState = {
    currentCourse: {},
    courses: [],
    courseLessons: [],
    currentSlide: {},
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

        case courseContants.UPDATE_SUCCESS:
            return {
                ...state,
                message: action.course,
            };

        case courseContants.GETALL_COURSE_SUCCESS:
            let courseList = action.courses

            courseList = courseList.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
            
            return {
                ...state,
                courses: courseList,
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

        case courseContants.DELETE_SLIDE_FROM_COURSE_LESSON:
            const deleteFromLessonObj = {
                ...state.courseLessons[action.lessonIndex]
            };

            deleteFromLessonObj.slides.splice(action.slideIndex, 1);
        
            lessons = [...state.courseLessons];
            lessons[action.lessonIndex] = deleteFromLessonObj;
        
            return {
                ...state,
                courseLessons: lessons
            }

        case courseContants.UPDATE_SLIDE_FROM_COURSE_LESSON:
            const updateFromLessonObj = {
                ...state.courseLessons[action.lessonIndex]
            };

            updateFromLessonObj.slides[action.slideIndex].title = action.slideObj.title;
            updateFromLessonObj.slides[action.slideIndex].subtitle = action.slideObj.subtitle;
            updateFromLessonObj.slides[action.slideIndex].hide_title = action.slideObj.hide_title;
        
            lessons = [...state.courseLessons];
            lessons[action.lessonIndex] = updateFromLessonObj;
        
            return {
                ...state,
                courseLessons: lessons,
            }
        
        case courseContants.APPEND:
            const { slideObj, lessonIndex } = action;

            const appendToLessonObj = {
                ...state.courseLessons[lessonIndex]
            };

            appendToLessonObj.slides.push(slideObj);

            if (action.columnArray.length > 0) {
                appendToLessonObj.slides[action.slideIndex].columns = action.columnArray;
            }
        
            lessons = [...state.courseLessons];
            lessons[lessonIndex] = appendToLessonObj;
            
            return {
                ...state,
                courseLessons: lessons,
                currentSlide: slideObj,
            };

        case courseContants.APPEND_SLIDE_COLUMNS_FROM_COURSE_LESSON:
            const updateSlideColumnFromLessonObj = {
                ...state.courseLessons[action.lessonIndex]
            };

            updateSlideColumnFromLessonObj.slides[action.slideIndex].columns = action.columnArray;
        
            lessons = [...state.courseLessons];
            lessons[action.lessonIndex] = updateSlideColumnFromLessonObj;
        
            return {
                ...state,
                courseLessons: lessons,
            }

        case courseContants.DELETE_SLIDE_COLUMN_FROM_COURSE_LESSON:
            const deleteColumnFromLessonObj = {
                ...state.courseLessons[action.lessonIndex]
            };

            deleteColumnFromLessonObj.slides[action.slideIndex].columns.splice(action.columnIndex, 1);
        
            lessons = [...state.courseLessons];
            lessons[action.lessonIndex] = deleteColumnFromLessonObj;
        
            return {
                ...state,
                courseLessons: lessons,
            };

        case courseContants.UPDATE_COURSE_LESSONS_LIST:
            return {
                ...state,
                courseLessons: action.courseLessonsList
            };
            
        case courseContants.UPDATE_COURSE_LIST:
            return {
                ...state,
                courses: action.courseList,
            };

        case courseContants.DUPLICATE_COURSE:
            const currentCourseList = state.courses;

            currentCourseList.push(action.course);

            return {
                ...state,
                courses: currentCourseList,
                currentCourse: action.course
            };

        case courseContants.GET_LATEST_LESSON_SLIDE:
            return {
                ...state,
                currentSlide: action.slideObj
            };
    
        case courseContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}