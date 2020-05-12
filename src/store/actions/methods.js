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

export const deleteLesson = (state, action) => {
    const lessonArray = [...state.courseLessons];
    lessonArray.splice(action.index, 1);

    return {
        ...state,
        courseLessons: lessonArray,
    }
}

export const addLessonSlides = (state, action) => {
    const lessonObj = {
        ...state.courseLessons[action.index]
    };

    const slide = {slideName: action.slideName}

    if (lessonObj.slides) {
        lessonObj.slides.push(slide);
    } else {
        lessonObj.slides = []
        lessonObj.slides.push(slide);
    }

    const lessons = [...state.courseLessons];
    lessons[action.index] = lessonObj;

    return {
        ...state,
        courseLessons: lessons,
    }
}