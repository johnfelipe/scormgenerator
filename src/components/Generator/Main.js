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
import ConfirmationModal from '../AlertModal/Confirmation';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentClickedLessonId: '',
            resourceFilesObject: [],
            transcriptFileObject: [],
            glossaryEntryObject: [],
            mediaFilesObject: [],
        };
        
        this.onLessonClickListener = this.onLessonClickListener.bind(this);
        this.resourceFilesHandler = this.resourceFilesHandler.bind(this);
        this.transcriptFileHandler = this.transcriptFileHandler.bind(this);
        this.glossaryHandler = this.glossaryHandler.bind(this);
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

    render() {
        return (
            <div id="generator-container">
                <Formik
                    initialValues={{ 
                        courseTitle: this.props.courseTitle,
                        courseLogo: this.props.courseLogo,
                        navigationType: this.props.navigationType,
                        showProgressbar: this.props.showProgressbar ? this.props.showProgressbar : false,
                    }}

                    onSubmit={values => {
                        console.log(values);
                        this.props.addCourseTitle(values.courseTitle);
                        this.props.addCourseLogo(values.courseLogo);
                        this.props.chooseNavigationType(values.navigationType);
                        this.props.showHideProgressbar(values.showProgressbar);
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
                                            onChange={handleChange}
                                            value={values.courseTitle}
                                            onBlur={handleBlur}
                                            placeholder="Type course name here . . ."
                                        />
                                        {errors.courseTitle && touched.courseTitle && (
                                            <div className="input-feedback">{errors.courseTitle}</div>
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            id="courseLogo"
                                            name="courseLogo"
                                            type="file"
                                            className="form-control custom-file-input"
                                            onChange={(event) => {setFieldValue("courseLogo", event.currentTarget.files[0]);}}
                                            onBlur={handleBlur}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                        <label htmlFor="courseLogo" className="custom-file-label" id="custom-form-label"> { values.courseLogo ? values.courseLogo.name : <span>Choose file</span> }</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <NavigationHandler currentType={values.navigationType} name="navigationType" handleChange={handleChange}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <div className="text-center">
                                            <GalleryHandler addMediaFiles={this.props.addMediaFiles} galleryHandler={this.galleryHandler} mediaFilesObject={this.state.mediaFilesObject} location="home"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <div className="float-right mt-2">
                                            <CheckBoxInput currentCbValue={values.showProgressbar} name="showProgressbar" label="Show/Hide Progress Bar" handleChange={handleChange} onBlur={handleBlur}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
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
                                    <div className="col-md-4 mt-2">
                                        <GlossaryHandler addGlossaryEntries={this.props.addGlossaryEntries} glossaryHandler={this.glossaryHandler} glossaryData={this.state.glossaryEntryObject}/>
                                    </div>
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
                                                                    <SlideHandler
                                                                        addSlideChange={this.props.addLessonSlide}
                                                                        action="add"
                                                                        slideId={index}
                                                                        mediaFilesObject={this.state.mediaFilesObject}
                                                                        addMediaFiles={this.props.addMediaFiles}
                                                                        galleryHandler={this.galleryHandler}
                                                                    />
                                                                    {this.props.courseLessons[index].slides ?
                                                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                                                            <Droppable droppableId="slides">
                                                                                {(provided) => (
                                                                                    <div
                                                                                        className="slide-container mt-3"
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        {this.props.courseLessons[index].slides.map((item, index) => (
                                                                                            <Draggable
                                                                                                key={index}
                                                                                                draggableId={'' + index}
                                                                                                index={index}>
                                                                                                {(provided) => (
                                                                                                    <div
                                                                                                        className="slide-item"
                                                                                                        ref={provided.innerRef}
                                                                                                        {...provided.draggableProps}
                                                                                                        {...provided.dragHandleProps}
                                                                                                    >
                                                                                                        <span className="btn pr-1">{item.slideName}</span>
                                                                                                        <SlideHandler
                                                                                                            editSlideChange={this.props.editLessonSlide}
                                                                                                            currentSlideName={item.slideName}
                                                                                                            currentColumns={item.columns}
                                                                                                            currentClickedLessonId={this.state.currentClickedLessonId}
                                                                                                            action="edit"
                                                                                                            slideId={index}
                                                                                                            showTitleValue={true}
                                                                                                            mediaFilesObject={this.state.mediaFilesObject}
                                                                                                            addMediaFiles={this.props.addMediaFiles}
                                                                                                            galleryHandler={this.galleryHandler}
                                                                                                        />

                                                                                                        <button className="btn btn-danger float-right lesson-item-remove-btn" title="Remove" onClick={() => this.props.deleteSlide(index, this.state.currentClickedLessonId)}><FontAwesomeIcon icon={faWindowClose} /></button>
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
                                        <LessonHandler addLessonNameChange={this.props.addCourseLessons} action="add"/>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        {/* <div id="save-btn-container" className="float-right">
                                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>Save</button>
                                        </div> */}
                                        <ConfirmationModal isSubmitting={isSubmitting}/>
                                    </div>
                                </div>
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
        editLessonSlide: (slideObj, slideId, currentClickedLessonId) => dispatch({type: 'EDIT_LESSON_SLIDE_NAME', slideObj: slideObj, index: slideId, currentClickedLessonId: currentClickedLessonId}),
        deleteSlide: (slideId, currentClickedLessonId) => dispatch({type: 'DELETE_SLIDE', index: slideId, currentClickedLessonId: currentClickedLessonId}),
        chooseNavigationType: (id) => dispatch({type: 'NAVIGATION_TYPE', typeId: id}),
        showHideProgressbar: (value) => dispatch({type: 'NAVIGATION_TYPE', value: value}),
        addResourceFiles: (value) => dispatch({type: 'ADD_RESOURCE_FILES', object: value}),
        addTranscriptFile: (value) => dispatch({type: 'ADD_TRANSCRIPT_FILE', object: value}),
        addGlossaryEntries: (value) => dispatch({type: 'ADD_GLOSSARY_ENTRIES', object: value}),
        addMediaFiles: (value) => dispatch({type: 'ADD_MEDIA_FILES', object: value}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
