import { columnContants } from '../constants';
import { columnService } from '../services';
// import { alertActions } from './';
// import { history } from '../helpers';

export const columnActions = {
    createColumn,
    updateColumn,
    deleteColumn,
    getAllColumn,
    duplicateColumn,
};

function createColumn(data) {
    return dispatch => {
        dispatch(request(data));

        columnService.createColumn(data)
            .then(
                column => { 
                    dispatch(success(column));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(column) { return { type: columnContants.REQUEST, column } }
    function success(column) { return { type: columnContants.CREATE_SUCCESS, column } }
    function failure(error) { return { type: columnContants.ERROR, error } }
}

function updateColumn(data, id) {
    return dispatch => {
        dispatch(request(data));

        columnService.updateColumn(data, id)
            .then(
                column => { 
                    dispatch(success(column));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(column) { return { type: columnContants.REQUEST, column } }
    function success(column) { return { type: columnContants.UPDATE_SUCCESS, column } }
    function failure(error) { return { type: columnContants.ERROR, error } }
}

function deleteColumn(id) {
    return dispatch => {
        dispatch(request(id));

        columnService.deleteColumn(id)
            .then(
                column => { 
                    dispatch(success(column));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };

    function request(column) { return { type: columnContants.REQUEST, column } }
    function success(column) { return { type: columnContants.DELETE, column } }
    function failure(error) { return { type: columnContants.ERROR, error } }
}

function getAllColumn() {
    return dispatch => {

        columnService.getAllColumn()
            .then(
                columns => { 
                    dispatch(success(columns));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };
    
    function success(columns) { return { type: columnContants.GETALL_COLUMN_SUCCESS, columns } }
    function failure(error) { return { type: columnContants.ERROR, error } }
}

function duplicateColumn() {
    return dispatch => {

        columnService.duplicateColumn()
            .then(
                columns => { 
                    dispatch(success(columns));
                    // dispatch(alertActions.success('Slide created successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    console.log(error);
                }
            );
    };
    
    function success(columns) { return { type: columnContants.DUPLICATE_COLUMN, columns } }
    function failure(error) { return { type: columnContants.ERROR, error } }
}
