import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { gallery } from './gallery.reducer';
import { course } from './course.reducer';

const rootReducer = combineReducers({
    alert,
    gallery,
    course,
});

export default rootReducer;