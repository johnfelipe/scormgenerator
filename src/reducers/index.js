import { combineReducers } from 'redux';

// custom reducers
import { alert } from './alert.reducer';
import { course } from './course.reducer';
import { gallery } from './gallery.reducer';
import { lesson } from './lesson.reducer';

const rootReducer = combineReducers({
    alert,
    course,
    gallery,
    lesson,
});

export default rootReducer;