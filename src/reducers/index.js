import { combineReducers } from 'redux';

// custom reducers
import { course } from './course.reducer';
import { gallery } from './gallery.reducer';
import { lesson } from './lesson.reducer';
import { slide } from './slide.reducer';
import { column } from './column.reducer';
import { coursemeta } from './coursemeta.reducer';

const rootReducer = combineReducers({
    course,
    gallery,
    lesson,
    slide,
    column,
    coursemeta,
});

export default rootReducer;