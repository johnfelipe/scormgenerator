import { columnContants } from '../constants';
import { columnService } from '../services';
// import { alertActions } from './';
// import { history } from '../helpers';

export const columnActions = {
    createColumn,
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
