import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import NavigationHandler from '../Handlers/NavigationHandler';
import CheckBoxInput from '../Handlers/CheckBoxHandler';
import ResourcesHandler from '../Handlers/ResourcesHandler';
import TranscriptHandler from '../Handlers/TranscriptHandler';
import GlossaryHandler from '../Handlers/GlossaryHandler';
import LessonHandler from '../Handlers/LessonHandler';
import GalleryHandler from '../Handlers/GalleryHandler';
import SgDropdownSelect from '../WebuppsComponents/SgDropdownSelect';
import { courseActions, lessonActions, galleryActions, slideActions, coursemetaActions } from '../../actions';
import { galleryService } from '../../services';
import { lessonNotifications, slideNotifications } from '../../notifications';
import CourseEditorAccordion from './CourseEditorAccordion';

function CourseEditor() {
    
    const dispatch = useDispatch();
    const url = window.location.pathname;
    // const url = window.location.hash;
    const cid = url.split('/')[url.split('/').length - 1];
    console.log(cid);
    const currentCourse = useSelector(state => state.course.currentCourse ? state.course.currentCourse : {});
    const currentLesson = useSelector(state => state.lesson.currentLesson ? state.lesson.currentLesson : {});
    const courseLessons = useSelector(state => state.course.courseLessons ? state.course.courseLessons : {});
    // const currentFile = useSelector(state => state.gallery.currentFile ? state.gallery.currentFile : {});
    const lessonActionMsg = useSelector(state => state.lesson.message ? state.lesson.message : '');
    const currentCoursemeta = useSelector(state => state.coursemeta.currentCoursemeta ? state.coursemeta.currentCoursemeta : {});
    const resourceFilesObject = useSelector(state => state.coursemeta.coursemetasResources ? state.coursemeta.coursemetasResources : []);
    const transcriptFileObject = useSelector(state => state.coursemeta.coursemetasTranscript ? state.coursemeta.coursemetasTranscript : []);
    const glossaryEntryObject = useSelector(state => state.coursemeta.coursemetasGlossary ? state.coursemeta.coursemetasGlossary : []);
    const coursemetaActionMsg = useSelector(state => state.coursemeta.message ? state.coursemeta.message : '');

    const [currentClickedLessonId, setCurrentClickedLessonId] = useState('');
    // const [courseNameExist, setCourseNameExist] = useState(false);
    const [lessonId, setLessonId] = useState(-1);
    // const [courseId, setCourseId] = useState(-1);
    const [lid, setLid] = useState(-1);
    const courseTypeOptions = [
        {label: 'Scorm 1.2', value: 'Scorm 1.2'},
        {label: 'Scorm 2004', value: 'Scorm 2004'},
    ];
    const courseLayoutOptions = [
        {label: 'Fixed', value: 'fixed'},
        {label: 'Fluid', value: 'fluid'},
    ];

    useEffect(() => {
        dispatch(courseActions.getCourse(cid));
        dispatch(courseActions.getCourseLessons(cid));
        dispatch(galleryActions.getAllFiles());
        dispatch(coursemetaActions.getCoursemetaByRkey(cid, "resources"));
        dispatch(coursemetaActions.getCoursemetaByRkey(cid, "transcript"));
        dispatch(coursemetaActions.getCoursemetaByRkey(cid, "glossary"));
        // setCourseId(cid);
    }, [dispatch, cid, currentLesson, lessonActionMsg, currentCoursemeta, coursemetaActionMsg]);

    useEffect(() => {
        const lessonAction = sessionStorage.getItem('lessonAction');
        const slideAction = sessionStorage.getItem('slideAction');

        if (lessonAction === "update") {
            lessonNotifications.lessonUpdateToast();
        } else if (lessonAction === "create") {
            lessonNotifications.lessonCreateToast();
        }

        if (slideAction === "update") {
            slideNotifications.slideUpdateToast();
        } else if (slideAction === "create") {
            slideNotifications.slideCreateToast();
        }
        sessionStorage.clear();
    });

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEndLessons = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if ((source.droppableId === "lessons") && (destination.droppableId === "lessons") && (source.droppableId === destination.droppableId)) {
            const courseLessonList = courseLessons;

            const reordered_lessons = reorder(
                courseLessonList,
                source.index,
                destination.index
            );
            let lessons = reordered_lessons;

            for (let i = 0; i < lessons.length; i++) {
                const data = {
                    weight: i
                }
                lessons[i].weight = i;
                dispatch(lessonActions.updateLesson(data, lessons[i].lid));
            }

            dispatch(courseActions.updateCourseLessonsList(lessons));
        }
    }

    const redirectToAddSlidePage = (currentCourse, lessonIndex, lesson, lessonId) => {
        const data = {
            courseLayout: currentCourse.layout,
            action: "add",
            lessonIndex: lessonIndex,
            slideItemId: 
                lesson.slides ?
                    lesson.slides.length > 0 ?
                        "slide-item-" + lesson.slides.length
                    :
                        "slide-item-" + 0
                :
                    "slide-item-" + 0
            ,
            lessonId: lessonId,
            cid: currentCourse.cid,
            uid: currentCourse.uid,
            lid: lid,
            sid: 
                lesson.slides ?
                    lesson.slides.length > 0 ?
                        lesson.slides[lesson.slides.length - 1].sid + 1
                    :
                        1
                :
                    1
            ,
            currentSlideIndex: 
                lesson.slides ?
                    lesson.slides.length > 0 ?
                        lesson.slides.length
                    :
                        0
                :
                    0
            ,
            slideWeight: 
                lesson.slides ?
                    lesson.slides.length > 0 ?
                        lesson.slides.length + 1
                    :
                        1
                :
                    1
            ,
        }

        sessionStorage.setItem("cid", currentCourse.cid)

        dispatch(slideActions.toAddSlidePage(data));
    }

    const redirectToEditSlidePage = (currentCourse, slide, lessonIndex, lesson, slideIndex) => {
        const data = {
            courseLayout: currentCourse.layout,
            sid: slide.sid,
            cid: currentCourse.cid,
            uid: currentCourse.uid,
            lid: lesson.lid,
            currentSlideName: slide.title,
            currentSlideSubtitle: slide.subtitle,
            currentColumns: slide.columns,
            hide_title: slide.hide_title,
            currentClickedLessonId: currentClickedLessonId,
            action: "edit",
            currentSlideIndex: slideIndex,
            slideItemId: "slide-item-" + slideIndex,
            lessonIndex: lessonIndex,
        }

        sessionStorage.setItem("cid", currentCourse.cid)

        dispatch(slideActions.toAddSlidePage(data));
    }

    return (
        <div id="generator-container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                transition={Slide}
            />

            <Breadcrumb bsPrefix="breadcrumb p-0">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/course/" + currentCourse.cid }} active={true}>Course</Breadcrumb.Item>
            </Breadcrumb>

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
                    courseType: currentCourse ? currentCourse.type ? currentCourse.type : "Scorm 1.2" : "Scorm 1.2",
                    courseLayout: currentCourse ? currentCourse.layout ? currentCourse.layout : "fixed" : "fixed",
                }}

                onSubmit={values => {
                    const data = {
                        title: values.courseTitle,
                        logo: values.courseLogo.url,
                        navigation: values.navigationType,
                        progressbar: values.showProgressbar ? 1 : 0,
                        status: 1,
                        type: values.courseType,
                        layout: values.courseLayout,
                        weight: 0,
                    }

                    sessionStorage.setItem('courseAction', 'update');

                    dispatch(courseActions.updateCourse(data, currentCourse.cid));
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
                                <div className="col-md-9 pr-0">
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
                                <div className="col-md-3">
                                    {/* <label htmlFor="courseLogo" className="position-absolute ml-4-5 mt-1">Logo:</label> */}
                                    <input
                                        id="courseLogo"
                                        name="courseLogo"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={(event) => {
                                            // setFieldValue("courseLogo", event.currentTarget.files[0]);
                                            const formData = new FormData();

                                            formData.append('file', event.currentTarget.files[0]);
                                            formData.append('uid', currentCourse.uid);
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
                                    <label htmlFor="courseLogo" className="webupps-course-logo mr-3" id="custom-form-label"> { values.courseLogo ? values.courseLogo.name : <span>Choose file</span> }</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mt-2">
                                    <NavigationHandler
                                        currentType={values.navigationType}
                                        name="navigationType"
                                        handleChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-3 mt-2">
                                    <div className="text-center">
                                        <SgDropdownSelect
                                            selectTitle="Type"
                                            currentValue={values.courseType}
                                            defaultValue="Scorm 1.2"
                                            onChangeHandler={handleChange}
                                            selectId="courseType"
                                            selectHtmlFor="courseType"
                                            selectOptions={courseTypeOptions}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-2">
                                    <div className="text-center">
                                        <SgDropdownSelect
                                            selectTitle="Layout"
                                            currentValue={values.courseLayout}
                                            defaultValue="fixed"
                                            onChangeHandler={handleChange}
                                            selectId="courseLayout"
                                            selectHtmlFor="courseLayout"
                                            selectOptions={courseLayoutOptions}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-2">
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
                                <div className="col-md-3 mt-2">
                                    <ResourcesHandler
                                        resourceFilesData={resourceFilesObject}
                                        cid={cid}
                                        uid={currentCourse && currentCourse.uid}
                                    />
                                     {/* <div className="text-break mt-2">
                                            Files Uploaded: &nbsp;
                                            <strong>
                                            {resourceFilesObject.length !== 0 ? 
                                                resourceFilesObject.map((item, index) => (
                                                    index + 1 !== resourceFilesObject.length ?
                                                        <label key={index} >{item.rvalue.split('/')[5]},&nbsp;</label>
                                                    :
                                                        <label key={index} >{item.rvalue.split('/')[5]}</label>
                                                ))
                                            :
                                                <span></span>
                                            }
                                            </strong>
                                    </div> */}
                                </div>
                                <div className="col-md-3 mt-2">
                                    <div className="text-center">
                                        <GalleryHandler
                                            location="home"
                                            buttonName="Gallery"
                                            uid={currentCourse && currentCourse.uid}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-2">
                                    <div className="text-center">
                                        <GlossaryHandler
                                            glossaryData={glossaryEntryObject}
                                            cid={cid}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-2">
                                    <div className="text-right">
                                        <TranscriptHandler
                                            transcriptFileData={transcriptFileObject}
                                            cid={cid}
                                            uid={currentCourse && currentCourse.uid}
                                        />
                                    </div>
                                    {/* {
                                        transcriptFileObject.length !== 0 ? 
                                            <span className="text-break">
                                                File Uploaded: &nbsp;
                                                {transcriptFileObject.map((item, index) => (
                                                    <strong key={"transcript-" + index}><label> {item.rvalue.split('/')[5]}</label></strong>
                                                ))}
                                            </span>
                                        :
                                            <span></span>
                                    } */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-2">
                                    <div id="lesson-container">
                                        <DragDropContext onDragEnd={onDragEndLessons}>
                                            <Droppable droppableId="lessons">
                                                {(provided) => (
                                                    <div
                                                        className="lesson-container"
                                                        ref={provided.innerRef}
                                                    >
                                                        {courseLessons && courseLessons.map((lesson, lessonIndex) => (
                                                            <Draggable
                                                                key={'courseLesson-' + lessonIndex}
                                                                draggableId={'courseLesson-' + lessonIndex}
                                                                index={lessonIndex}>
                                                                {(provided) => (
                                                                    <div
                                                                        id={"lesson-item-" + lessonIndex}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <CourseEditorAccordion
                                                                            lessonIndex={lessonIndex}
                                                                            lesson={lesson}
                                                                            currentCourse={currentCourse}
                                                                            dragHandleProps={provided.dragHandleProps}
                                                                            courseLessons={courseLessons}
                                                                            currentClickedLessonId={currentClickedLessonId}
                                                                            cid={cid}
                                                                            lessonId={lessonId}
                                                                            setCurrentClickedLessonId={setCurrentClickedLessonId}
                                                                            redirectToAddSlidePage={redirectToAddSlidePage}
                                                                            redirectToEditSlidePage={redirectToEditSlidePage}
                                                                            setLid={setLid}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
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
                                        lessonWeight={courseLessons.length > 0 ? courseLessons.length + 1 : 1}
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

export default CourseEditor;
