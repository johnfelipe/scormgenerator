import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Formik } from "formik";
import * as Yup from 'yup';
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
// import ConfirmationModal from '../AlertModal/Confirmation';
import WarningModal from '../AlertModal/Warning';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentClickedLessonId: '',
            resourceFilesObject: [],
            transcriptFileObject: [],
            glossaryEntryObject: [],
            mediaFilesObject: [],
            courseNameExist: false,
            slideItemIndex: 0,
        };
        
        this.onLessonClickListener = this.onLessonClickListener.bind(this);
        this.resourceFilesHandler = this.resourceFilesHandler.bind(this);
        this.transcriptFileHandler = this.transcriptFileHandler.bind(this);
        this.glossaryHandler = this.glossaryHandler.bind(this);
        this.galleryHandler = this.galleryHandler.bind(this);
        this.setCourseNameExist = this.setCourseNameExist.bind(this);
        this.setSlideItemIndex = this.setSlideItemIndex.bind(this);
    }

    componentDidUpdate = () => {
        // console.log(this.props.courseTitle);
        // console.log(this.props.courseLogo);
        // console.log(this.props.navigationType);
        // console.log(this.props.showProgressbar);
        // console.log(this.state.resourceFilesObject);
        // console.log(this.state.transcriptFileObject);
        console.log(this.props.courseLessons);
        // console.log(this.state.glossaryEntryObject);
        this.props.course['lessons'] = this.props.courseLessons;
        console.log(this.props.course);
    }

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const lessonSlideList = this.props.courseLessons[this.state.currentClickedLessonId].slides;

            const reordered_slides = this.reorder(
                lessonSlideList,
                source.index,
                destination.index
            );
            let slides = reordered_slides;

            const lessons = [...this.props.courseLessons];
            lessons[this.state.currentClickedLessonId].slides = slides;

            this.props.updateCourseLessons(lessons);
        }
    };

    onLessonClickListener = (id) => {
        this.setState({
            currentClickedLessonId: id,
        })
    }

    resourceFilesHandler = (object) => {
        this.setState({
            resourceFiles: object,
        })
    }

    transcriptFileHandler = (object) => {
        this.setState({
            transcriptFile: object,
        })
    }

    glossaryHandler = (object) => {
        this.setState({
            glossaryObject: object,
        })
    }

    galleryHandler = (object) => {
        this.setState({
            mediaFilesObject: object,
        })
    }

    setCourseNameExist = (value) => {
        this.setState({
            courseNameExist: value,
        })
    }

    setSlideItemIndex = (value) => {
        this.setState({
            slideItemIndex: value,
        })
    }

    render() {
        return (
            <div id="generator-container">
                <Formik
                    initialValues={{
                        courseLogo: this.props.courseLogo,
                        navigationType: this.props.navigationType,
                        showProgressbar: this.props.showProgressbar ? this.props.showProgressbar : false,
                    }}

                    onSubmit={values => {
                        console.log(values);

                        if (this.state.courseNameExist !== true) {
                            this.props.addCourseTitle(values.courseTitle);
                            console.log('Clickuko!');
                        }

                        this.props.addCourseLogo(values.courseLogo);
                        this.props.chooseNavigationType(values.navigationType);
                        this.props.showHideProgressbar(values.showProgressbar);

                        // create course
                        // uid is temporary
                        this.props.createCourse(1, values.courseLogo, values.navigationType, values.showProgressbar, values.courseTitle);
                        localStorage.setItem("CourseLessons", JSON.stringify(this.props.courseLessons));
                        localStorage.setItem("Course", JSON.stringify(this.props.course));
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
                                    <div className="col-md-12 text-center">
                                        <h3>Try it out!</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <input
                                            id="courseTitle"
                                            name="courseTitle"
                                            type="text"
                                            className={(errors.courseTitle && touched.courseTitle && "error form-control") || "form-control"}
                                            value={values.courseTitle}
                                            onBlur={(e) => {
                                                    handleBlur(e)

                                                    if (e.target.value.trim() === "") {
                                                        this.setCourseNameExist(false);
                                                    }
                                                }
                                            }
                                            onChange={(e) => {
                                                    handleChange(e)

                                                    if (e.target.value.trim() !== "") {
                                                        this.props.addCourseTitle(values.courseTitle);
                                                        this.setCourseNameExist(true);
                                                    }
                                                }
                                            }
                                            placeholder="Type course name here . . ."
                                        />
                                        {errors.courseTitle && touched.courseTitle && (
                                            <div className="input-feedback">{errors.courseTitle}</div>
                                        )}
                                    </div>
                                    {
                                        this.state.courseNameExist ?
                                            <div className="col-md-3">
                                                <input
                                                    id="courseLogo"
                                                    name="courseLogo"
                                                    type="file"
                                                    className="form-control custom-file-input"
                                                    onChange={(event) => {setFieldValue("courseLogo", event.currentTarget.files[0])}}
                                                    onBlur={handleBlur}
                                                    accept="image/x-png,image/jpeg"
                                                />
                                                <label htmlFor="courseLogo" className="custom-file-label" id="custom-form-label"> { values.courseLogo ? values.courseLogo.name : <span>Choose file</span> }</label>
                                            </div>
                                        :
                                            <div className="col-md-3">
                                                <WarningModal 
                                                    fieldType="label"
                                                    htmlFor="courseLogo"
                                                    labelClasses="custom-file-label"
                                                    labelId="custom-form-label"
                                                    label="Choose file"
                                                    modalMessage="Please enter a course name first"
                                                />
                                            </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <NavigationHandler currentType={values.navigationType} name="navigationType" handleChange={handleChange} courseNameExist={this.state.courseNameExist}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <div className="text-center">
                                            <GalleryHandler addMediaFiles={this.props.addMediaFiles} galleryHandler={this.galleryHandler} mediaFilesObject={this.state.mediaFilesObject} location="home"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <div className="float-right mt-2">
                                            <CheckBoxInput currentCbValue={values.showProgressbar} name="showProgressbar" label="Progress Bar" handleChange={handleChange} onBlur={handleBlur} courseNameExist={this.state.courseNameExist}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        this.state.courseNameExist ?
                                            <div className="col-md-4 mt-2">
                                                <ResourcesHandler addResourceFiles={this.props.addResourceFiles} resourceFilesHandler={this.resourceFilesHandler} resourceFilesData={this.state.resourceFilesObject}/>
                                                {
                                                    this.state.resourceFilesObject.length !== 0 ? 
                                                    <span>
                                                    Files Uploaded: &nbsp;
                                                    {this.state.resourceFilesObject.map((item, index) => (
                                                        index + 1 !== this.state.resourceFilesObject.length ? <strong key={index} ><label key={index} >&nbsp;{item.file.name},</label></strong> : <strong key={index} ><label key={index} >&nbsp;{item.file.name}</label></strong>
                                                    ))}</span> : <span></span>
                                                }
                                            </div>
                                        :
                                            <div className="col-md-4 mt-2">
                                                <div id="resources-btn-container">
                                                    <WarningModal 
                                                        fieldType="buttonWithLabel"
                                                        htmlFor="resourcesBtn"
                                                        labelClasses="mr-2"
                                                        label="Upload Resources (Optional):"
                                                        btnClasses="btn btn-outline-dark"
                                                        btnLabel="Resources"
                                                        modalMessage="Please enter a course name first"
                                                    />
                                                </div>
                                            </div>
                                    }
                                    {
                                        this.state.courseNameExist ?
                                            <div className="col-md-4 mt-2">
                                                <div className="text-center">
                                                    <TranscriptHandler addTranscriptFile={this.props.addTranscriptFile} transcriptFileHandler={this.transcriptFileHandler} transcriptFileData={this.state.transcriptFileObject}/>
                                                </div>
                                                {
                                                    this.state.transcriptFileObject.length !== 0 ? 
                                                    <span>
                                                    File Uploaded: &nbsp;
                                                    {this.state.transcriptFileObject.map((item) => (
                                                        <strong><label> {item.transcriptFile.name}</label></strong>
                                                    ))}</span> : <span></span>
                                                }
                                            </div>
                                        :
                                            <div className="col-md-4 mt-2">
                                                <div className="text-center">
                                                    <div id="transcript-btn-container">
                                                        <WarningModal 
                                                            fieldType="buttonWithLabel"
                                                            htmlFor="transcriptBtn"
                                                            labelClasses="mr-2"
                                                            label="Upload Transcript (Optional):"
                                                            btnClasses="btn btn-outline-dark"
                                                            btnLabel="Transcript"
                                                            modalMessage="Please enter a course name first"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                    {
                                        this.state.courseNameExist ?
                                            <div className="col-md-4 mt-2">
                                                <GlossaryHandler addGlossaryEntries={this.props.addGlossaryEntries} glossaryHandler={this.glossaryHandler} glossaryData={this.state.glossaryEntryObject}/>
                                            </div>
                                        :
                                            <div className="col-md-4 mt-2">
                                                <div id="add-glossary-container" className="float-right">
                                                    <WarningModal 
                                                        fieldType="buttonWithLabel"
                                                        htmlFor="glossaryBtn"
                                                        labelClasses="mr-2"
                                                        label="Add Glossary (Optional):"
                                                        btnClasses="btn btn-outline-dark"
                                                        btnLabel="Glossary"
                                                        modalMessage="Please enter a course name first"
                                                    />
                                                </div>
                                            </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-2">
                                        <div id="lesson-container">
                                            <div className="lesson-container">
                                                {this.props.courseLessons.map((item, index) => (
                                                    <Accordion
                                                        key={index}
                                                    >
                                                        <Card>
                                                            <Card.Header>
                                                                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="pr-0">
                                                                    <span onClick={() => this.onLessonClickListener(index)}>{item.lessonName}</span>
                                                                </Accordion.Toggle>
                                                                <LessonHandler editLessonNameChange={this.props.editCourseLessonName} action="edit" currentLessonName={item.lessonName} id={index}/>

                                                                <button className="btn btn-danger float-right lesson-item-remove-btn" title="Remove" onClick={() => this.props.deleteLesson(index)}><FontAwesomeIcon icon={faWindowClose} /></button>
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey="0">
                                                                <Card.Body>
                                                                    {
                                                                        this.props.courseLessons[index].slides ?
                                                                            this.props.courseLessons[index].slides.length < 5 ?
                                                                                <SlideHandler
                                                                                    addSlideChange={this.props.addLessonSlide}
                                                                                    action="add"
                                                                                    slideId={this.state.slideItemIndex}
                                                                                    lessonIndex={index}
                                                                                    mediaFilesObject={this.state.mediaFilesObject}
                                                                                    addMediaFiles={this.props.addMediaFiles}
                                                                                    galleryHandler={this.galleryHandler}
                                                                                    slideItemId={"slide-item-" + this.state.slideItemIndex}
                                                                                    setSlideItemIndex={this.setSlideItemIndex}
                                                                                />
                                                                            :
                                                                                <div id="slide-handler-container" className="d-inline">
                                                                                    <WarningModal 
                                                                                        fieldType="addSlideBtn"
                                                                                        btnClasses="btn btn-success"
                                                                                        btnLabel="Add Slide"
                                                                                        modalMessage="You have reached the maximum limit for free users"
                                                                                    />
                                                                                </div>
                                                                        :
                                                                            <SlideHandler
                                                                                addSlideChange={this.props.addLessonSlide}
                                                                                action="add"
                                                                                slideId={this.state.slideItemIndex}
                                                                                lessonIndex={index}
                                                                                mediaFilesObject={this.state.mediaFilesObject}
                                                                                addMediaFiles={this.props.addMediaFiles}
                                                                                galleryHandler={this.galleryHandler}
                                                                                slideItemId={"slide-item-" + this.state.slideItemIndex}
                                                                                setSlideItemIndex={this.setSlideItemIndex}
                                                                            />
                                                                    }
                                                                    {
                                                                        this.props.courseLessons[index].slides ?
                                                                            <DragDropContext onDragEnd={this.onDragEnd}>
                                                                                <Droppable droppableId="slides">
                                                                                    {(provided) => (
                                                                                        <div
                                                                                            className="slide-container mt-3"
                                                                                            ref={provided.innerRef}
                                                                                        >
                                                                                            {this.props.courseLessons[index].slides.map((item, itemSlideIndex) => (
                                                                                                <Draggable
                                                                                                    key={itemSlideIndex}
                                                                                                    draggableId={'' + itemSlideIndex}
                                                                                                    index={itemSlideIndex}>
                                                                                                    {(provided) => (
                                                                                                        <div
                                                                                                            id={"slide-item-" + itemSlideIndex}
                                                                                                            className="slide-item"
                                                                                                            ref={provided.innerRef}
                                                                                                            {...provided.draggableProps}
                                                                                                            {...provided.dragHandleProps}
                                                                                                        >
                                                                                                            <span className="btn pr-1">{item.slideName}</span>
                                                                                                            <SlideHandler
                                                                                                                editSlideChange={this.props.editLessonSlide}
                                                                                                                currentSlideName={item.slideName}
                                                                                                                currentSlideSubtitle={item.slideSubtitle}
                                                                                                                currentColumns={item.columns}
                                                                                                                currentClickedLessonId={this.state.currentClickedLessonId}
                                                                                                                action="edit"
                                                                                                                slideId={itemSlideIndex}
                                                                                                                showTitleValue={true}
                                                                                                                mediaFilesObject={this.state.mediaFilesObject}
                                                                                                                addMediaFiles={this.props.addMediaFiles}
                                                                                                                galleryHandler={this.galleryHandler}
                                                                                                                slideItemId={"slide-item-" + itemSlideIndex}
                                                                                                                lessonIndex={index}
                                                                                                                setSlideItemIndex={this.setSlideItemIndex}
                                                                                                            />
                                                                                                            <button 
                                                                                                                className="btn btn-danger float-right lesson-item-remove-btn" 
                                                                                                                title="Remove" 
                                                                                                                onClick={() => this.props.deleteSlide(itemSlideIndex, this.state.currentClickedLessonId)}
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
                                {
                                    this.state.courseNameExist ?
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                {        
                                                    this.props.courseLessons.length < 2 ?
                                                        <LessonHandler addLessonNameChange={this.props.addCourseLessons} action="add"/>
                                                    :
                                                        <WarningModal 
                                                            fieldType="addLessonBtn"
                                                            btnClasses="btn btn-success"
                                                            btnLabel="Add Lesson"
                                                            modalMessage="You have reached the maximum limit for free users"
                                                        />
                                                }
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <div id="save-btn-container" className="float-right">
                                                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>Generate Course</button>
                                                </div>
                                                {/* <ConfirmationModal isSubmitting={isSubmitting}/> */}
                                            </div>
                                        </div>
                                    :
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <div id="lesson-handler-container" className="d-inline">
                                                    <div id="add-lesson-btn" className="float-left">
                                                        <button type="button" className="btn btn-success" disabled>Add Lesson</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <div id="save-btn-container" className="float-right">
                                                    <button type="submit" className="btn btn-success" disabled>Generate Course</button>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </form>
                        );
                    }}
                </Formik>
            </div>
        )
    }
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
        editLessonSlide: (slideObj, slideId, currentClickedLessonId) => dispatch({type: 'EDIT_LESSON_SLIDE_NAME', slideObj: slideObj, slideId: slideId, currentClickedLessonId: currentClickedLessonId}),
        deleteSlide: (slideId, currentClickedLessonId) => dispatch({type: 'DELETE_SLIDE', index: slideId, currentClickedLessonId: currentClickedLessonId}),
        chooseNavigationType: (id) => dispatch({type: 'NAVIGATION_TYPE', typeId: id}),
        showHideProgressbar: (value) => dispatch({type: 'NAVIGATION_TYPE', value: value}),
        addResourceFiles: (value) => dispatch({type: 'ADD_RESOURCE_FILES', object: value}),
        addTranscriptFile: (value) => dispatch({type: 'ADD_TRANSCRIPT_FILE', object: value}),
        addGlossaryEntries: (value) => dispatch({type: 'ADD_GLOSSARY_ENTRIES', object: value}),
        addMediaFiles: (value) => dispatch({type: 'ADD_MEDIA_FILES', object: value}),
        createCourse: (userId, logo, navigation, progressbar, title) => dispatch({type: 'CREATE_COURSE', uid: userId, logo: logo, navigation: navigation, progressbar: progressbar, title: title}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
