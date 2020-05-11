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
        case types.ADD_COURSE_TITLE: {
            return {
                ...state,
                courseTitle: action.courseTitle,
            }
        }
        case types.ADD_COURSE_LOGO: {
            return {
                ...state,
                courseLogo: action.courseLogo,
            }
        }
        case types.ADD_COURSE_LESSONS: {
            const lessonObj = {'lessonName': action.lessonName};

            return {
                ...state,
                courseLessons: [...state.courseLessons, lessonObj],
            }
        }
        case types.UPDATE_COURSE_LESSONS: {
            return {
                ...state,
                courseLessons: action.courseLessons,
            }
        }
        case types.EDIT_COURSE_LESSON_NAME: {
            const lessonObj = {
                ...state.courseLessons[action.index]
            };
            lessonObj.lessonName = action.lessonName;
    
            const lessons = [...state.courseLessons];
            lessons[action.index] = lessonObj;

            return {
                ...state,
                courseLessons: lessons,
            }
        }
        case types.DELETE_LESSON: {
            const lessonArray = [...state.courseLessons];
            lessonArray.splice(action.index, 1);

            return {
                ...state,
                courseLessons: lessonArray,
            }
        }
        case types.ADD_LESSON_SLIDES: {
            const lessonObj = {
                ...state.courseLessons[action.index]
            };
    
            const slide = {slideName: action.slideName}
    
            if (lessonObj.slides) {
                lessonObj.slides.push(slide);
            } else {
                lessonObj.slides = []
                lessonObj.slides.push(slide);
            }
    
            const lessons = [...state.courseLessons];
            lessons[action.index] = lessonObj;

            return {
                ...state,
                courseLessons: lessons,
            }
        }
        case types.EDIT_LESSON_SLIDE_NAME: {
            const lessonObj = {
                ...state.courseLessons[action.currentClickedLessonId]
            };
    
            lessonObj.slides[action.index].slideName = action.slideName;
    
            const lessons = [...state.courseLessons];
            lessons[action.currentClickedLessonId] = lessonObj;
    
            return {
                ...state,
                courseLessons: lessons,
            }
        }
        case types.DELETE_SLIDE: {
            const lessonObj = {
                ...state.courseLessons[action.currentClickedLessonId]
            };
            lessonObj.slides.splice(action.index, 1);
    
            const lessons = [...state.courseLessons];
            lessons[action.currentClickedLessonId] = lessonObj;
    
            return {
                ...state,
                courseLessons: lessons,
            }
        }
        case types.NAVIGATION_TYPE: {
            return {
                ...state,
                navigationType: action.typeId,
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
