import React, { useState, useEffect } from 'react';

// react bootstrap library
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// formik and related libraries
import { Formik } from "formik";
import * as Yup from 'yup';

// redux library
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';

// components
import NavigationHandler from '../Handlers/NavigationHandler';
import CheckBoxInput from '../Handlers/CheckBoxHandler';
import ResourcesHandler from '../Handlers/ResourcesHandler';
import TranscriptHandler from '../Handlers/TranscriptHandler';
import GlossaryHandler from '../Handlers/GlossaryHandler';
import LessonHandler from '../Handlers/LessonHandler';
import SlideHandler from '../Handlers/SlideHandler';
import GalleryHandler from '../Handlers/GalleryHandler';

//modal
// import WarningModal from '../AlertModal/Warning';

// actions
import { courseActions, lessonActions, galleryActions, slideActions, coursemetaActions } from '../../actions';

// services
import { galleryService } from '../../services';

function CourseEditor() {
    
    const dispatch = useDispatch();
    
    const url = window.location.pathname;
    const cid = url.split('/')[2];
    const currentCourse = useSelector(state => state.course.currentCourse ? state.course.currentCourse : {});
    const currentLesson = useSelector(state => state.lesson.currentLesson ? state.lesson.currentLesson : {});
    const courseLessons = useSelector(state => state.course.courseLessons ? state.course.courseLessons : {});
    const currentFile = useSelector(state => state.gallery.currentFile ? state.gallery.currentFile : {});
    const lessonActionMsg = useSelector(state => state.lesson.message ? state.lesson.message : '');
    const currentCoursemeta = useSelector(state => state.coursemeta.currentCoursemeta ? state.coursemeta.currentCoursemeta : {});
    const resourceFilesObject = useSelector(state => state.coursemeta.coursemetasResources ? state.coursemeta.coursemetasResources : []);
    const transcriptFileObject = useSelector(state => state.coursemeta.coursemetasTranscript ? state.coursemeta.coursemetasTranscript : []);
    // const glossaryEntryObject = useSelector(state => state.coursemeta.coursemetasGlossary ? state.coursemeta.coursemetasGlossary : []);
    const coursemetaActionMsg = useSelector(state => state.coursemeta.message ? state.coursemeta.message : '');

    const [currentClickedLessonId, setCurrentClickedLessonId] = useState('');
    // const [resourceFilesObject, setResourceFilesObject] = useState([]);
    // const [transcriptFileObject, setTranscriptFileObject] = useState([]);
    const [glossaryEntryObject, setGlossaryEntryObject] = useState([]);
    // const [mediaFilesObject, setMediaFilesObject] = useState([]);
    // const [courseNameExist, setCourseNameExist] = useState(false);
    const [lessonId, setLessonId] = useState(-1);
    // const [courseId, setCourseId] = useState(-1);
    const [lid, setLid] = useState(-1);

    useEffect(() => {
        dispatch(courseActions.getCourse(cid));
        dispatch(courseActions.getCourseLessons(cid));
        dispatch(galleryActions.getAllFiles());
        dispatch(coursemetaActions.getCoursemetaByRkey(cid, "resources"));
        dispatch(coursemetaActions.getCoursemetaByRkey(cid, "transcript"));
        // setCourseId(cid);
    }, [dispatch, cid, currentLesson, currentFile, lessonActionMsg, currentCoursemeta, coursemetaActionMsg]);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const lessonSlideList = courseLessons[currentClickedLessonId].slides;

            const reordered_slides = reorder(
                lessonSlideList,
                source.index,
                destination.index
            );
            let slides = reordered_slides;

            const lessons = [...courseLessons];
            lessons[currentClickedLessonId].slides = slides;

            // this.props.updateCourseLessons(lessons);
        }
    }

    return (
        <div id="generator-container">
            <Formik
                enableReinitialize={true}

                initialValues={{
                    courseTitle: currentCourse ? currentCourse.title ? currentCourse.title : '' : '',
                    courseLogo: {
                        name: currentCourse ? currentCourse.logo ? currentCourse.logo.split('/')[currentCourse.logo.split('/').length - 1] : '' : '',
                        url: currentCourse ? currentCourse.logo : '',
                    },
                    navigationType: currentCourse ? currentCourse.navigation ? currentCourse.navigation : 0 : 0,
                    showProgressbar: currentCourse ? currentCourse.progressbar === 1 ? true : false : 0,
                }}

                onSubmit={values => {
                    // console.log(values);

                    // if (courseNameExist !== true) {
                    //     this.props.addCourseTitle(values.courseTitle);
                    //     console.log('Clickuko!');
                    // }

                    // this.props.addCourseLogo(values.courseLogo);
                    // this.props.chooseNavigationType(values.navigationType);
                    // this.props.showHideProgressbar(values.showProgressbar);

                    // // create course
                    // // uid is temporary
                    // this.props.createCourse(1, values.courseLogo, values.navigationType, values.showProgressbar, values.courseTitle);
                    // localStorage.setItem("CourseLessons", JSON.stringify(this.props.courseLessons));
                    // localStorage.setItem("Course", JSON.stringify(this.props.course));
                }}

                validationSchema={Yup.object().shape({
                    courseTitle: Yup.string()
                        .required("Course title required"),
                    }
                )}
            >
            {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8 pr-0">
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        className={(errors.courseTitle && touched.courseTitle && "error form-control") || "form-control"}
                                        value={values.courseTitle}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Type course name here . . ."
                                    />
                                    {errors.courseTitle && touched.courseTitle && (
                                        <div className="input-feedback">{errors.courseTitle}</div>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="courseLogo" className="position-absolute ml-3 mt-1">Logo:</label>
                                    <input
                                        id="courseLogo"
                                        name="courseLogo"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={(event) => {
                                            // setFieldValue("courseLogo", event.currentTarget.files[0]);
                                            const formData = new FormData();

                                            formData.append('file', event.currentTarget.files[0]);
                                            formData.append('uid', 1);
                                            formData.append('alt', event.currentTarget.files[0].name);

                                            galleryService.uploadFiles(formData)
                                            .then(
                                                fileObject => {
                                                    console.log(fileObject);
                                                    setFieldValue("courseLogo", fileObject);
                                                },
                                                error => console.log(error)
                                            );
                                        }}
                                        onBlur={handleBlur}
                                        accept="image/*"
                                    />
                                    <label htmlFor="courseLogo" className="course-logo mr-3" id="custom-form-label"> { values.courseLogo ? values.courseLogo.name : <span>Choose file</span> }</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <NavigationHandler
                                        currentType={values.navigationType}
                                        name="navigationType"
                                        handleChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-center">
                                        <GalleryHandler
                                            // addMediaFiles={this.props.addMediaFiles}
                                            // mediaFilesObject={mediaFilesObject}
                                            location="home"
                                            // setMediaFilesObject={setMediaFilesObject}
                                            buttonName="Gallery"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="float-right mt-2">
                                        <CheckBoxInput
                                            currentCbValue={values.showProgressbar}
                                            name="showProgressbar"
                                            label="Progress Bar"
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <ResourcesHandler
                                        resourceFilesData={resourceFilesObject}
                                        cid={cid}
                                        uid={currentCourse && currentCourse.uid}
                                    />
                                    {
                                        resourceFilesObject.length !== 0 ? 
                                            <span className="text-break">
                                                Files Uploaded: &nbsp;
                                                {resourceFilesObject.map((item, index) => (
                                                    index + 1 !== resourceFilesObject.length ?
                                                        <strong key={"resources-" + index}>
                                                            <label key={index} >{item.rvalue.split('/')[5]},&nbsp;</label>
                                                        </strong>
                                                    :
                                                        <strong key={index}>
                                                            <label key={index} >{item.rvalue.split('/')[5]}</label>
                                                        </strong>
                                                ))}
                                            </span>
                                        :
                                            <span></span>
                                    }
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-center">
                                        <TranscriptHandler
                                            // addTranscriptFile={this.props.addTranscriptFile}
                                            // setTranscriptFileObject={setTranscriptFileObject}
                                            transcriptFileData={transcriptFileObject}
                                            cid={cid}
                                            uid={currentCourse && currentCourse.uid}
                                        />
                                    </div>
                                    {
                                        transcriptFileObject.length !== 0 ? 
                                            <span className="text-break">
                                                File Uploaded: &nbsp;
                                                {transcriptFileObject.map((item, index) => (
                                                    <strong key={"transcript-" + index}><label> {item.rvalue.split('/')[5]}</label></strong>
                                                ))}
                                            </span>
                                        :
                                            <span></span>
                                    }
                                </div>
                                <div className="col-md-4 mt-2">
                                    <GlossaryHandler
                                        // addGlossaryEntries={this.props.addGlossaryEntries}
                                        setGlossaryEntryObject={setGlossaryEntryObject}
                                        glossaryData={glossaryEntryObject}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-2">
                                    <div id="lesson-container">
                                        <div className="lesson-container">
                                            {courseLessons && courseLessons.map((lesson, lessonIndex) => (
                                                <Accordion key={lessonIndex}>
                                                    <Card>
                                                        <Card.Header>
                                                            <Accordion.Toggle
                                                                as={Button}
                                                                variant="link"
                                                                eventKey="0"
                                                                className="pr-0"
                                                                onClick={() => {
                                                                    setCurrentClickedLessonId(lessonIndex);
                                                                    setLid(lesson.lid);
                                                                }}
                                                            >
                                                                <span>{lesson.title}</span>
                                                            </Accordion.Toggle>
                                                            <LessonHandler
                                                                // editLessonNameChange={this.props.editCourseLessonName}
                                                                action="edit"
                                                                currentLessonName={lesson.title}
                                                                id={lessonIndex}
                                                                cid={lesson.cid}
                                                                uid={lesson.uid}
                                                                lid={lesson.lid}
                                                            />

                                                            <button
                                                                className="btn btn-danger float-right lesson-item-remove-btn"
                                                                title="Remove"
                                                                onClick={() => {
                                                                    // this.props.deleteLesson(lessonIndex)
                                                                    dispatch(lessonActions.deleteLesson(lesson.lid));
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faWindowClose} />
                                                            </button>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                                <SlideHandler
                                                                    action="add"
                                                                    lessonIndex={lessonIndex}
                                                                    slideItemId={
                                                                        lesson.slides ?
                                                                            lesson.slides.length > 0 ?
                                                                                "slide-item-" + lesson.slides.length
                                                                            :
                                                                                "slide-item-" + 0
                                                                        :
                                                                            "slide-item-" + 0
                                                                    }
                                                                    lessonId={lessonId}
                                                                    cid={currentCourse && currentCourse.cid}
                                                                    uid={currentCourse && currentCourse.uid}
                                                                    lid={lid}
                                                                    sid={
                                                                        lesson.slides ?
                                                                            lesson.slides.length > 0 ?
                                                                                lesson.slides[lesson.slides.length - 1].sid + 1
                                                                            :
                                                                                1
                                                                        :
                                                                            1
                                                                    }
                                                                    currentSlideIndex={
                                                                        lesson.slides ?
                                                                            lesson.slides.length > 0 ?
                                                                                lesson.slides.length
                                                                            :
                                                                                0
                                                                        :
                                                                            0
                                                                    }
                                                                    slideWeight={
                                                                        lesson.slides ?
                                                                            lesson.slides.length > 0 ?
                                                                                lesson.slides.length
                                                                            :
                                                                                1
                                                                        :
                                                                            1
                                                                    }
                                                                />
                                                                {lesson.slides && lesson.slides.length > 0 ?
                                                                    <DragDropContext onDragEnd={onDragEnd}>
                                                                        <Droppable droppableId="slides">
                                                                            {(provided) => (
                                                                                <div
                                                                                    className="slide-container mt-3"
                                                                                    ref={provided.innerRef}
                                                                                >
                                                                                    {lesson.slides.map((slide, slideIndex) => (
                                                                                        <Draggable
                                                                                            key={slideIndex}
                                                                                            draggableId={'' + slideIndex}
                                                                                            index={slideIndex}>
                                                                                            {(provided) => (
                                                                                                <div
                                                                                                    id={"slide-item-" + slideIndex}
                                                                                                    className="slide-item"
                                                                                                    ref={provided.innerRef}
                                                                                                    {...provided.draggableProps}
                                                                                                    {...provided.dragHandleProps}
                                                                                                >
                                                                                                    <span className="btn pr-1">{slide.title}</span>
                                                                                                    <SlideHandler
                                                                                                        sid={slide.sid}
                                                                                                        cid={currentCourse && currentCourse.cid}
                                                                                                        uid={currentCourse && currentCourse.uid}
                                                                                                        lid={lesson.lid}
                                                                                                        currentSlideName={slide.title}
                                                                                                        currentSlideSubtitle={slide.subtitle}
                                                                                                        currentColumns={slide.columns}
                                                                                                        hide_title={slide.hide_title}
                                                                                                        currentClickedLessonId={currentClickedLessonId}
                                                                                                        action="edit"
                                                                                                        currentSlideIndex={slideIndex}
                                                                                                        slideItemId={"slide-item-" + slideIndex}
                                                                                                        lessonIndex={lessonIndex}
                                                                                                        // setSlideItemIndex={setSlideItemIndex}
                                                                                                        // addMediaFiles={this.props.addMediaFiles}
                                                                                                        // mediaFilesObject={mediaFilesObject}
                                                                                                        // setMediaFilesObject={setMediaFilesObject}
                                                                                                    />
                                                                                                    <button 
                                                                                                        className="btn btn-danger float-right lesson-item-remove-btn" 
                                                                                                        title="Remove" 
                                                                                                        onClick={() => {
                                                                                                            // this.props.deleteSlide(slideIndex, currentClickedLessonId)
                                                                                                            dispatch(slideActions.deleteSlide(slide.sid));
                                                                                                            dispatch(courseActions.deleteSlideFromCourseLesson(slideIndex, currentClickedLessonId));
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faWindowClose} />
                                                                                                    </button>
                                                                                                </div>
                                                                                            )}
                                                                                        </Draggable>
                                                                                    ))}
                                                                                    {provided.placeholder}
                                                                                </div>
                                                                            )}
                                                                        </Droppable>
                                                                    </DragDropContext>
                                                                :
                                                                    <div className="mt-2">No slide added yet.</div>
                                                                }
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mt-2">
                                    <LessonHandler
                                        action="add"
                                        setLessonId={setLessonId}
                                        cid={currentCourse && currentCourse.cid}
                                        uid={currentCourse && currentCourse.uid}
                                        lid={lid}
                                        lessonWeight={courseLessons.length > 0 ? courseLessons.length : 1}
                                    />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <div id="save-btn-container" className="float-right">
                                        <button type="submit" className="btn btn-success" disabled={isSubmitting}>Save Course</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        courseTitle: state.courseTitle,
        courseLogo: state.courseLogo,
        courseLessons: state.courseLessons,
        navigationType: state.navigationType,
        showProgressbar: state.showProgressbar,
        resourceFiles: state.resourceFiles,
        transcriptFile: state.transcriptFile,
        glossaryEntries: state.glossaryEntries,
        mediaFiles: state.mediaFiles,
        course: state.course,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCourseTitle: (courseTitle) => dispatch({type: 'ADD_COURSE_TITLE', courseTitle: courseTitle}),
        addCourseLogo: (courseLogo) => dispatch({type: 'ADD_COURSE_LOGO', courseLogo: courseLogo}),
        addCourseLessons: (lessonName) => dispatch({type: 'ADD_COURSE_LESSONS', lessonName: lessonName}),
        updateCourseLessons: (courseLessons) => dispatch({type: 'UPDATE_COURSE_LESSONS', courseLessons: courseLessons}),
        editCourseLessonName: (lessonName, lessonId) => dispatch({type: 'EDIT_COURSE_LESSON_NAME', lessonName: lessonName, index: lessonId}),
        deleteLesson: (lessonId) => dispatch({type: 'DELETE_LESSON', index: lessonId}),
        addLessonSlide: (slideObj, lessonId) => dispatch({type: 'ADD_LESSON_SLIDES', slideObj: slideObj, index: lessonId}),
        editLessonSlide: (slideObj, currentSlideIndex, currentClickedLessonId) => dispatch({type: 'EDIT_LESSON_SLIDE_NAME', slideObj: slideObj, currentSlideIndex: currentSlideIndex, currentClickedLessonId: currentClickedLessonId}),
        deleteSlide: (currentSlideIndex, currentClickedLessonId) => dispatch({type: 'DELETE_SLIDE', index: currentSlideIndex, currentClickedLessonId: currentClickedLessonId}),
        chooseNavigationType: (id) => dispatch({type: 'NAVIGATION_TYPE', typeId: id}),
        showHideProgressbar: (value) => dispatch({type: 'SHOW_HIDE_PROGRESSBAR', value: value}),
        addResourceFiles: (value) => dispatch({type: 'ADD_RESOURCE_FILES', object: value}),
        addTranscriptFile: (value) => dispatch({type: 'ADD_TRANSCRIPT_FILE', object: value}),
        addGlossaryEntries: (value) => dispatch({type: 'ADD_GLOSSARY_ENTRIES', object: value}),
        addMediaFiles: (value) => dispatch({type: 'ADD_MEDIA_FILES', object: value}),
        createCourse: (userId, logo, navigation, progressbar, title) => dispatch({type: 'CREATE_COURSE', uid: userId, logo: logo, navigation: navigation, progressbar: progressbar, title: title}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor);
