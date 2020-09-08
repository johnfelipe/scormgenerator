import { columnContants } from '../constants';
const initialState = {
    currentColumn: {},
    columns: [],
    allColumns: [],
}

export function column(state = initialState, action) {
    switch (action.type) {
        case columnContants.REQUEST:
            return {
                ...state,
                loading: true
            };

        case columnContants.CREATE_SUCCESS:
            return {
                ...state,
                currentColumn: action.column,
                columns: [...state.columns, action.column]
            };

        case columnContants.GETALL_COLUMN_SUCCESS:
            return {
                ...state,
                allColumns: action.columns
            };

        case columnContants.UPDATE_SUCCESS:
            return {
                ...state,
                message: action.column
            };
    
        case columnContants.ERROR:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }
}