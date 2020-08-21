import { courseContants } from '../constants';
import { courseService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const courseActions = {
    getAll,
    createCourse,
    getCourse,
    getCourseLessons,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        courseService.getAll()
            .then(
                courses => { 
                    dispatch(success(courses));
                },
                error => {
                    dispatch(failure(error.toString()))
                }
            );
    };

    function request(courses) { return { type: courseContants.REQUEST, courses } }
    function success(courses) { return { type: courseContants.GETALL_COURSE_SUCCESS, courses } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}

function createCourse(data) {
    return dispatch => {
        dispatch(request(data));

        courseService.createCourse(data)
            .then(
                course => { 
                    dispatch(success(course));
                    dispatch(alertActions.success('Course created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(course) { return { type: courseContants.REQUEST, course } }
    function success(course) { return { type: courseContants.CREATE_SUCCESS, course } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}

function getCourse(id) {
    return dispatch => {
        dispatch(request(id));

        courseService.getCourse(id)
            .then(
                course => { 
                    dispatch(success(course));
                    dispatch(alertActions.success('Course fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: courseContants.REQUEST, id } }
    function success(course) { return { type: courseContants.GET_COURSE_SUCCESS, course } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}

function getCourseLessons(id) {
    return dispatch => {
        dispatch(request(id));

        courseService.getCourseLessons(id)
            .then(
                lessons => { 
                    dispatch(success(lessons));
                    dispatch(alertActions.success('Course lessons fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: courseContants.REQUEST, id } }
    function success(course) { return { type: courseContants.GET_COURSE_LESSONS_SUCCESS, course } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}
