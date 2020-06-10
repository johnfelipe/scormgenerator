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

export const addLessonSlide = (state, action) => {
    const lessonObj = {
        ...state.courseLessons[action.index]
    };

    const slide = action.slideObj

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

export const editLessonSlide = (state, action) => {
    const lessonObj = {
        ...state.courseLessons[action.currentClickedLessonId]
    };

    lessonObj.slides[action.index] = action.slideObj;

    const lessons = [...state.courseLessons];
    lessons[action.currentClickedLessonId] = lessonObj;

    return {
        ...state,
        courseLessons: lessons,
    }
}

export const deleteSlide = (state, action) => {
    const lessonObj = {
        ...state.courseLessons[action.currentClickedLessonId]
    };
    lessonObj.slides.splice(action.index, 1);

    const lessons = [...state.courseLessons];
    lessons[action.currentClickedLessonId] = lessonObj;

    return {
        ...state,
        courseLessons: lessons,
    }
}

export const chooseNavigationType = (state, action) => {
    return {
        ...state,
        navigationType: action.typeId,
    }
}

export const showHideProgressbar = (state, action) => {
    return {
        ...state,
        showProgressbar: action.value,
    }
}

export const addResourceFiles = (state, action) => {
    return {
        ...state,
        resourceFiles: action.object,
    }
}

export const addTranscriptFile = (state, action) => {
    return {
        ...state,
        transcriptFile: action.object,
    }
}

export const addGlossaryEntries = (state, action) => {
    return {
        ...state,
        glossaryEntries: action.object,
    }
}

export const addMediaFiles = (state, action) => {
    return {
        ...state,
        mediaFiles: action.object,
    }
}

export const createCourse = (state, action) => {
    const courseObject = {
        uid: action.uid,
        logo: action.logo,
        navigation: action.navigation,
        progressbar: action.progressbar,
        title: action.title,
    }

    return {
        ...state,
        course: courseObject,
    }
}
