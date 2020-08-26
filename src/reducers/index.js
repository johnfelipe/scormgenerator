import { combineReducers } from 'redux';

// custom reducers
import { alert } from './alert.reducer';
import { course } from './course.reducer';
import { gallery } from './gallery.reducer';
import { lesson } from './lesson.reducer';
import { slide } from './slide.reducer';
import { column } from './column.reducer';

const rootReducer = combineReducers({
    alert,
    course,
    gallery,
    lesson,
    slide,
    column,
});

export default rootReducer;