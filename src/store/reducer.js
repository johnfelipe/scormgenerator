import * as types from './actions/types';
import * as methods from './actions/methods';

const initialState = {
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
        case types.ADD_COURSE_TITLE: return methods.addCourseTitle(state, action);

        case types.ADD_COURSE_LOGO: return methods.addCourseLogo(state, action);

        case types.ADD_COURSE_LESSONS: return methods.addCourseLessons(state, action);

        case types.UPDATE_COURSE_LESSONS: return methods.updateCourseLessons(state, action);

        case types.EDIT_COURSE_LESSON_NAME: return methods.editCourseLessonName(state, action);

        case types.DELETE_LESSON: return methods.deleteLesson(state, action);

        case types.ADD_LESSON_SLIDES: return methods.addLessonSlide(state, action);

        case types.EDIT_LESSON_SLIDE_NAME: return methods.editLessonSlide(state, action);

        case types.DELETE_SLIDE: return methods.deleteSlide(state, action);

        case types.NAVIGATION_TYPE: return methods.chooseNavigationType(state, action);

        case types.SHOW_HIDE_PROGRESSBAR: return methods.showHideProgressbar(state, action);

        default: {
            return state;
        }
    }
}

export default reducer;
