import { slideContants } from '../constants';
import { slideService, } from '../services';
import { courseService } from '../services';
import { courseActions, columnActions } from './';
import { history } from '../helpers';

export const slideActions = {
    getAllSlides,
    createSlide,
    getSlide,
    getSlideColumns,
    updateSlide,
    deleteSlide,
    duplicateSlide,
    toAddSlidePage,
    toEditSlidePage,
};

function getAllSlides() {
    return dispatch => {
        dispatch(request());

        slideService.getAllSlides()
            .then(
                slides => { 
                    dispatch(success(slides));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(slides) { return { type: slideContants.REQUEST, slides } }
    function success(slides) { return { type: slideContants.GETALL_SLIDE_SUCCESS, slides } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function createSlide(data, lessonIndex, columnArray, slideIndex, uid, cid) {
    return dispatch => {
        dispatch(request(data));

        slideService.createSlide(data)
            .then(
                slide => { 
                    dispatch(success(slide));
                    slide.columns = [];
                    dispatch(courseActions.appendSlideToCourseLesson(slide, lessonIndex, columnArray, slideIndex));
                    // dispatch(alertActions.success('Slide created successfully'));
                    if (columnArray.length > 0) {
                        for (let index in columnArray) {
                            let featuresJson = JSON.stringify(columnArray[index]);
                    
                            const data = {
                                sid: slide.sid,
                                uid: uid,
                                grid: columnArray[index].grid,
                                features: btoa(featuresJson)
                            }
                    
                            console.log(data);
                            dispatch(columnActions.createColumn(data));
                        }

                        dispatch(courseActions.appendSlideColumnsFromCourseLesson(columnArray, slideIndex, lessonIndex));
                    }

                    courseService.getAll()
                    .then(
                        courses => { 
                            let weight = 0;

                            for (let i = 0; i < courses.length; i++) {
                                if (courses[i].cid !== cid) {
                                    const data = {
                                        weight: weight++
                                    }
                                    
                                    courseService.updateCourse(data, courses[i].cid);
                                }
                            }
                        },
                        error => {
                            dispatch(failure(error.toString()));
                            console.log(error);
                        }
                    );

                    history.push("/course/" + cid);
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(slide) { return { type: slideContants.REQUEST, slide } }
    function success(slide) { return { type: slideContants.CREATE_SUCCESS, slide } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function getSlide(id) {
    return dispatch => {
        dispatch(request(id));

        slideService.getSlide(id)
            .then(
                slide => { 
                    dispatch(success(slide));
                    // dispatch(alertActions.success('Slide fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slide) { return { type: slideContants.GET_SLIDE_SUCCESS, slide } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function getSlideColumns(id) {
    return dispatch => {
        dispatch(request(id));

        slideService.getSlideColumns(id)
            .then(
                slides => { 
                    dispatch(success(slides));
                    // dispatch(alertActions.success('Slide columns fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slides) { return { type: slideContants.GET_SLIDE_COLUMNS_SUCCESS, slides } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function updateSlide(data, id, cid, action) {
    return dispatch => {
        dispatch(request(data));

        slideService.updateSlide(data, id)
            .then(
                slide => { 
                    courseService.getAll()
                    .then(
                        courses => { 
                            let weight = 0;

                            for (let i = 0; i < courses.length; i++) {
                                if (courses[i].cid !== cid) {
                                    const data = {
                                        weight: weight++
                                    }

                                    courseService.updateCourse(data, courses[i].cid);
                                }
                            }
                        },
                        error => {
                            dispatch(failure(error.toString()));
                            console.log(error);
                        }
                    );

                    dispatch(success(slide));
                    // dispatch(alertActions.success('Slide updated successfully'));

                    if (action === "edit") {
                        history.push("/course/" + cid);
                        window.location.reload();
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slide) { return { type: slideContants.UPDATE_SUCCESS, slide } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function deleteSlide(id) {
    return dispatch => {
        dispatch(request(id));

        slideService.deleteSlide(id)
            .then(
                slide => { 
                    dispatch(success(slide));
                    console.log(slide);
                    // dispatch(alertActions.success('Slide updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slide) { return { type: slideContants.DELETE, slide } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function duplicateSlide(id) {
    return dispatch => {
        dispatch(request(id));

        slideService.duplicateSlide(id)
            .then(
                slide => { 
                    dispatch(success(slide));
                    // dispatch(alertActions.success('Slide updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slide) { return { type: slideContants.DUPLICATE_SLIDE, slide } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function toAddSlidePage(addSlideProps) {
    return dispatch => {
        dispatch(success(addSlideProps));
    };

    function success(addSlideProps) { return { type: slideContants.ADD_SLIDE_PROPS, addSlideProps } }
}

function toEditSlidePage(editSlideProps) {
    return dispatch => {
        dispatch(success(editSlideProps));
    };

    function success(editSlideProps) { return { type: slideContants.EDIT_SLIDE_PROPS, editSlideProps } }
}
