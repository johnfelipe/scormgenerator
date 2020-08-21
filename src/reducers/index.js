import { combineReducers } from 'redux';

// custom reducers
import { alert } from './alert.reducer';
import { course } from './course.reducer';

const rootReducer = combineReducers({
    course,
    alert,
});

export default rootReducer;