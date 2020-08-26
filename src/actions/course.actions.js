import { courseContants } from '../constants';
import { courseService } from '../services';
import { lessonService } from '../services';
import { slideService } from '../services';
// import { alertActions } from './';
// import { history } from '../helpers';

export const courseActions = {
    getAll,
    createCourse,
    getCourse,
    getCourseLessons,
    appendSlideToCourseLesson,
    deleteSlideFromCourseLesson,
    updateSlideFromCourseLesson,
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
                    dispatch(failure(error.toString()));
                    console.log(error);
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
                    // dispatch(alertActions.success('Course created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
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
                    // dispatch(alertActions.success('Course fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
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
                lessons.map((lesson, lessonIndex) => (
                    lessonService.getLessonSlides(lesson.lid)
                    .then(
                        slides => {
                            if (slides.length > 0) {
                                slides.map((slide, slideIndex) => (
                                    slideService.getSlideColumns(slide.sid)
                                    .then(
                                        columns => {
                                            if (columns.length > 0) {
                                                slides[slideIndex].columns = columns;
                                            }
                                        },
                                        error => {
                                            dispatch(failure(error.toString()));
                                            // dispatch(alertActions.error(error.toString()));
                                            console.log(error);
                                        }
                                    )
                                ));
                                
                                lessons[lessonIndex].slides = slides;
                            }
                        },
                        error => {
                            dispatch(failure(error.toString()));
                            // dispatch(alertActions.error(error.toString()));
                            console.log(error);
                        }
                    )
                ));
                dispatch(success(lessons));
                // dispatch(alertActions.success('Course lessons fetched successfully'));
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                console.log(error);
            }
        );
    };

    function request(id) { return { type: courseContants.REQUEST, id } }
    function success(lessons) { return { type: courseContants.GET_COURSE_LESSONS_SUCCESS, lessons } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}

function appendSlideToCourseLesson(slideObj, lessonIndex) {
    return dispatch => {
        dispatch(success(slideObj, lessonIndex));
    };
    
    function success(slideObj, lessonIndex) { return { type: courseContants.APPEND, slideObj, lessonIndex } }
}

function deleteSlideFromCourseLesson(slideIndex, lessonIndex) {
    return dispatch => {
        dispatch(success(slideIndex, lessonIndex));
    };
    
    function success(slideIndex, lessonIndex) { return { type: courseContants.DELETE_SLIDE_FROM_COURSE_LESSON, slideIndex, lessonIndex } }
}

function updateSlideFromCourseLesson(slideObj, slideIndex, lessonIndex) {
    return dispatch => {
        dispatch(success(slideObj, slideIndex, lessonIndex));
    };
    
    function success(slideObj, slideIndex, lessonIndex) { return { type: courseContants.UPDATE_SLIDE_FROM_COURSE_LESSON, slideObj, slideIndex, lessonIndex } }
}
