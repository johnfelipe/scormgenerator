export const addCourseTitle = (state, action) => {
    return {
        ...state,
        courseTitle: action.courseTitle,
    }
}

export const addCourseLogo = (state, action) => {
    return {
        ...state,
        courseLogo: action.courseLogo,
    }
}

export const addCourseLessons = (state, action) => {
    const lessonObj = {'lessonName': action.lessonName};

    return {
        ...state,
        courseLessons: [...state.courseLessons, lessonObj],
    }
}

export const updateCourseLessons = (state, action) => {
    return {
        ...state,
        courseLessons: action.courseLessons,
    }
}

export const editCourseLessonName = (state, action) => {
    const lessonObj = {
        ...state.courseLessons[action.index]
    };
    lessonObj.lessonName = action.lessonName;

    const lessons = [...state.courseLessons];
    lessons[action.index] = lessonObj;

    return {
        ...state,
        courseLessons: lessons,
    }
}