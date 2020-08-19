import { combineReducers } from 'redux';

import { course } from './course.reducer';
import { lesson } from './lesson.reducer';
import { slide } from './slide.reducer';
import { column } from './column.reducer';
import { file } from './file.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    course,
    lesson,
    slide,
    column,
    file,
    alert
});

export default rootReducer;