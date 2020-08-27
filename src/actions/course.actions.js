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
    appendSlideColumnsFromCourseLesson,
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
                            slides.map((slide, slideIndex) => (
                                slideService.getSlideColumns(slide.sid)
                                .then(
                                    columns => {
                                        // if (columns.length > 0) {
                                            let slideColumns = [];

                                            columns.map((columnProps) => {
                                                const parsedDecodedFeatures = JSON.parse(atob(columnProps.features));
                                                // const column = {
                                                //     type: 'column',
                                                //     name: columnProps.title,
                                                //     active: 0,
                                                //     grid: 0,
                                                //     id: 'column1',
                                                //     content: parsedDecodedFeatures,
                                                // }
                                                console.log(parsedDecodedFeatures);

                                                return slideColumns.push(parsedDecodedFeatures)
                                            });

                                            slides[slideIndex].columns = slideColumns;
                                        // }
                                    },
                                    error => {
                                        dispatch(failure(error.toString()));
                                        // dispatch(alertActions.error(error.toString()));
                                        console.log(error);
                                    }
                                )
                            ));
                            
                            lessons[lessonIndex].slides = slides;
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

function appendSlideColumnsFromCourseLesson(columnArray, slideIndex, lessonIndex) {
    return dispatch => {
        dispatch(success(columnArray, slideIndex, lessonIndex));
    };
    
    function success(columnArray, slideIndex, lessonIndex) { return { type: courseContants.APPEND_SLIDE_COLUMNS_FROM_COURSE_LESSON, columnArray, slideIndex, lessonIndex } }
}
