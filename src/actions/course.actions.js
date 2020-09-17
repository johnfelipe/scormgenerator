import { courseContants } from '../constants';
import { courseService } from '../services';
import { lessonService } from '../services';
import { slideService } from '../services';
// import { alertActions } from './';
import { history } from '../helpers';

export const courseActions = {
    getAll,
    createCourse,
    updateCourse,
    getCourse,
    getCourseLessons,
    appendSlideToCourseLesson,
    deleteSlideFromCourseLesson,
    updateSlideFromCourseLesson,
    appendSlideColumnsFromCourseLesson,
    deleteSlideColumnFromCourseLesson,
    getLatestLessonSlide,
    updateCourseLessonsList,
    updateCourseList,
    duplicateCourse,
    duplicateSlide,
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

function updateCourse(data, id) {
    return dispatch => {
        dispatch(request(data));

        courseService.updateCourse(data, id)
            .then(
                course => { 
                    dispatch(success(course));
                    history.push("/");
                    window.location.reload();
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
    function success(course) { return { type: courseContants.UPDATE_SUCCESS, course } }
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
                                        let slideColumns = [];

                                        columns.map((columnProps) => {
                                            const parsedDecodedFeatures = JSON.parse(decodeURIComponent(escape(atob(columnProps.features))));
                                            parsedDecodedFeatures.clid = columnProps.clid;
                                            parsedDecodedFeatures.sid = columnProps.sid;
                                            parsedDecodedFeatures.lid = lesson.lid;

                                            return slideColumns.push(parsedDecodedFeatures)
                                        });

                                        slides[slideIndex].columns = slideColumns;
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

function appendSlideToCourseLesson(slideObj, lessonIndex, columnArray, slideIndex) {
    return dispatch => {
        dispatch(success(slideObj, lessonIndex, columnArray, slideIndex));
    };
    
    function success(slideObj, lessonIndex, columnArray, slideIndex) { return { type: courseContants.APPEND, slideObj, lessonIndex, columnArray, slideIndex } }
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

function deleteSlideColumnFromCourseLesson(columnIndex, slideIndex, lessonIndex) {
    return dispatch => {
        dispatch(success(columnIndex, slideIndex, lessonIndex));
    };
    
    function success(columnIndex, slideIndex, lessonIndex) { return { type: courseContants.DELETE_SLIDE_COLUMN_FROM_COURSE_LESSON, columnIndex, slideIndex, lessonIndex } }
}

function getLatestLessonSlide(lessonId) {
    return dispatch => {
        dispatch(request(lessonId));

        lessonService.getLessonSlides(lessonId)
            .then(
                slides => {
                    const slideObj = slides[slides.length-1];
                    if (slideObj) {
                        dispatch(success(slideObj));
                    } else {
                        dispatch(success({}));
                    }
                    // dispatch(alertActions.success('Lesson slides fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(lessonId) { return { type: courseContants.REQUEST, lessonId } }
    function success(slideObj) { return { type: courseContants.GET_LATEST_LESSON_SLIDE, slideObj } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}

function updateCourseLessonsList(courseLessonsList) {
    return dispatch => {
        dispatch(success(courseLessonsList));
    };
    
    function success(courseLessonsList) { return { type: courseContants.UPDATE_COURSE_LESSONS_LIST, courseLessonsList } }
}

function updateCourseList(courseList) {
    return dispatch => {
        dispatch(success(courseList));
    };
    
    function success(courseList) { return { type: courseContants.UPDATE_COURSE_LIST, courseList } }
}

function duplicateCourse(id) {
    return dispatch => {
        dispatch(request(id));

        courseService.duplicateCourse(id)
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
    function success(course) { return { type: courseContants.DUPLICATE_COURSE, course } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}

function duplicateSlide(lessonIndex, lessonLid, sid) {
    return dispatch => {
        dispatch(request(sid));

        slideService.duplicateSlide(sid)
            .then(
                slide => { 
                    slideService.getSlideColumns(slide.sid)
                    .then(
                        columns => {
                            let slideColumns = [];

                            columns.map((columnProps) => {
                                const parsedDecodedFeatures = JSON.parse(decodeURIComponent(escape(atob(columnProps.features))));
                                parsedDecodedFeatures.clid = columnProps.clid;
                                parsedDecodedFeatures.sid = columnProps.sid;
                                parsedDecodedFeatures.lid = lessonLid;

                                return slideColumns.push(parsedDecodedFeatures)
                            });

                            slide.columns = slideColumns;
                        },
                        error => {
                            dispatch(failure(error.toString()));
                            // dispatch(alertActions.error(error.toString()));
                            console.log(error);
                        }
                    )
                    dispatch(success(slide, lessonIndex));
                    // dispatch(alertActions.success('Slide updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: courseContants.REQUEST, id } }
    function success(duplicateSlideObj, duplicateLessonIndex) { return { type: courseContants.DUPLICATE_SLIDE, duplicateSlideObj, duplicateLessonIndex } }
    function failure(error) { return { type: courseContants.ERROR, error } }
}
