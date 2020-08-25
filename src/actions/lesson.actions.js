import { lessonContants } from '../constants';
import { lessonService } from '../services';
// import { alertActions } from './';
// import { history } from '../helpers';

export const lessonActions = {
    getAllLessons,
    createLesson,
    getLesson,
    getLessonSlides,
    updateLesson,
};

function getAllLessons() {
    return dispatch => {
        dispatch(request());

        lessonService.getAllLessons()
            .then(
                lessons => {
                    dispatch(success(lessons));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(lessons) { return { type: lessonContants.REQUEST, lessons } }
    function success(lessons) { return { type: lessonContants.GETALL_LESSON_SUCCESS, lessons } }
    function failure(error) { return { type: lessonContants.ERROR, error } }
}

function createLesson(data) {
    return dispatch => {
        dispatch(request(data));

        lessonService.createLesson(data)
            .then(
                lesson => { 
                    dispatch(success(lesson));
                    // dispatch(alertActions.success('Lesson created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(lesson) { return { type: lessonContants.REQUEST, lesson } }
    function success(lesson) { return { type: lessonContants.CREATE_SUCCESS, lesson } }
    function failure(error) { return { type: lessonContants.ERROR, error } }
}

function getLesson(id) {
    return dispatch => {
        dispatch(request(id));

        lessonService.getLesson(id)
            .then(
                lesson => { 
                    dispatch(success(lesson));
                    // dispatch(alertActions.success('Lesson fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: lessonContants.REQUEST, id } }
    function success(lesson) { return { type: lessonContants.GET_LESSON_SUCCESS, lesson } }
    function failure(error) { return { type: lessonContants.ERROR, error } }
}

function getLessonSlides(id) {
    return dispatch => {
        dispatch(request(id));

        lessonService.getLessonSlides(id)
            .then(
                slides => { 
                    dispatch(success(slides));
                    // dispatch(alertActions.success('Lesson slides fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: lessonContants.REQUEST, id } }
    function success(slides) { return { type: lessonContants.GET_LESSON_SLIDES_SUCCESS, slides } }
    function failure(error) { return { type: lessonContants.ERROR, error } }
}

function updateLesson(data, id) {
    return dispatch => {
        dispatch(request(data));

        lessonService.updateLesson(data, id)
            .then(
                lesson => { 
                    dispatch(success(lesson));
                    // dispatch(alertActions.success('Lesson updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: lessonContants.REQUEST, id } }
    function success(lesson) { return { type: lessonContants.UPDATE_SUCCESS, lesson } }
    function failure(error) { return { type: lessonContants.ERROR, error } }
}
