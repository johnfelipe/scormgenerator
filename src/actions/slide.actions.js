import { slideContants } from '../constants';
import { slideService } from '../services';
import { alertActions } from './';
// import { history } from '../helpers';

export const slideActions = {
    getAllSlides,
    createSlide,
    getSlide,
    getSlideColumns,
    updateSlide,
};

function getAllSlides() {
    return dispatch => {
        dispatch(request());

        slideService.getAllSlides()
            .then(
                lessons => { 
                    dispatch(success(lessons));
                },
                error => {
                    dispatch(failure(error.toString()))
                }
            );
    };

    function request(lessons) { return { type: slideContants.REQUEST, lessons } }
    function success(lessons) { return { type: slideContants.GETALL_SLIDE_SUCCESS, lessons } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function createSlide(data) {
    return dispatch => {
        dispatch(request(data));

        slideService.createSlide(data)
            .then(
                slide => { 
                    dispatch(success(slide));
                    dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
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
                    dispatch(alertActions.success('Slide fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
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
                    dispatch(alertActions.success('Slide columns fetched successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slides) { return { type: slideContants.GET_SLIDE_COLUMNS_SUCCESS, slides } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}

function updateSlide(data, id) {
    return dispatch => {
        dispatch(request(data));

        slideService.updateSlide(data, id)
            .then(
                slide => { 
                    dispatch(success(slide));
                    dispatch(alertActions.success('Slide updated successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: slideContants.REQUEST, id } }
    function success(slide) { return { type: slideContants.UPDATE_SUCCESS, slide } }
    function failure(error) { return { type: slideContants.ERROR, error } }
}
