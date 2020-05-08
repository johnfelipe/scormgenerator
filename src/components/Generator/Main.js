import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Formik } from "formik";
import * as Yup from 'yup';
import { connect } from 'react-redux';

// components
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';
import ResourcesHandler from '../Handlers/ResourcesHandler';
import TranscriptHandler from '../Handlers/TranscriptHandler';
import AddGlossary from './AddGlossary';
import LessonHandler from '../Handlers/LessonHandler';
import SlideHandler from '../Handlers/SlideHandler';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
            courseLogo: '',
            resourceFiles: [],
            transcriptFile: {},
            navigationType: '',
            showProgressbar: '',
            lessons: [],
            currentClickedLessonId: '',
        };
        
        this.addLessonNameHandler = this.addLessonNameHandler.bind(this);
        this.editLessonNameHandler = this.editLessonNameHandler.bind(this);
        this.removeLesson = this.removeLesson.bind(this);
        this.onLessonClickListener = this.onLessonClickListener.bind(this);
        this.addSlideHandler = this.addSlideHandler.bind(this);
        this.editSlideHandler = this.editSlideHandler.bind(this);
        this.removeSlide = this.removeSlide.bind(this);
        this.resourceFilesHandler = this.resourceFilesHandler.bind(this);
        this.transcriptFileHandler = this.transcriptFileHandler.bind(this);
    }

    componentDidUpdate = () => {
        console.log(this.props.courseTitle);
        console.log(this.props.courseLogo);
        console.log(this.state.resourceFiles);
        console.log(this.state.lessons);
    }

    addLessonNameHandler = (name) => {
        const lessonObj = {'lessonName': name};
        this.setState({
            lessons: [...this.state.lessons, lessonObj],
        })
    }

    editLessonNameHandler = (name, index) => {
        const lessonObj = {
            ...this.state.lessons[index]
        };
        lessonObj.lessonName = name;

        const lessons = [...this.state.lessons];
        lessons[index] = lessonObj;

        this.setState({
            lessons: lessons,
        })
    }

    removeLesson = (index) => {
        const lessonArray = [...this.state.lessons];
        lessonArray.splice(index, 1);

        this.setState({
            lessons: lessonArray,
        })
    }

    addSlideHandler = (name, index) => {
        const lessonObj = {
            ...this.state.lessons[index]
        };

        const slide = {slideName: name}

        if (lessonObj.slides) {
            lessonObj.slides.push(slide);
        } else {
            lessonObj.slides = []
            lessonObj.slides.push(slide);
        }

        const lessons = [...this.state.lessons];
        lessons[index] = lessonObj;

        this.setState({
            lessons: lessons,
        })
    }

    editSlideHandler = (name, index) => {
        const lessonObj = {
            ...this.state.lessons[this.state.currentClickedLessonId]
        };

        lessonObj.slides[index].slideName = name;

        const lessons = [...this.state.lessons];
        lessons[this.state.currentClickedLessonId] = lessonObj;

        this.setState({
            lessons: lessons,
        });
    }

    removeSlide = (index) => {
        const lessonObj = {
            ...this.state.lessons[this.state.currentClickedLessonId]
        };
        lessonObj.slides.splice(index, 1);

        const lessons = [...this.state.lessons];
        lessons[this.state.currentClickedLessonId] = lessonObj;

        this.setState({
            lessons: lessons,
        });
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
            const lessonSlideList = this.state.lessons[this.state.currentClickedLessonId].slides;

            const reordered_slides = this.reorder(
                lessonSlideList,
                source.index,
                destination.index
            );
            let slides = reordered_slides;

            const lessons = [...this.state.lessons];
            lessons[this.state.currentClickedLessonId].slides = slides;

            this.setState({
                lessons: lessons,
            });
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

    render() {
        return (
            <div id="generator-container">
            <Formik
                    initialValues={{ 
                        courseTitle: this.props.courseTitle,
                        courseLogo: this.props.courseLogo,
                    }}

                    onSubmit={values => {
                        console.log(values);
                        this.props.addCourseTitle(values.courseTitle);
                        this.props.addCourseLogo(values.courseLogo);
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
                                    <div className="col-md-8 mt-2">
                                        <SelectInput />
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <div className="float-right mt-2">
                                            <CheckBoxInput label="Show/Hide Progress Bar" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <ResourcesHandler resourceFilesHandler={this.resourceFilesHandler} resourceFilesData={this.state.resourceFiles}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <TranscriptHandler transcriptFileHandler={this.transcriptFileHandler} transcriptFileData={this.state.transcriptFile}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <AddGlossary />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-2">
                                        <div id="lesson-container">
                                            <div
                                                className="lesson-container"
                                            >
                                                {this.state.lessons.map((item, index) => (
                                                    <Accordion
                                                        key={index}
                                                    >
                                                        <Card>
                                                            <Card.Header>
                                                                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="pr-0">
                                                                    <span onClick={() => this.onLessonClickListener(index)}>{item.lessonName}</span>
                                                                </Accordion.Toggle>
                                                                <LessonHandler editLessonNameChange={this.editLessonNameHandler} action="edit" currentLessonName={item.lessonName} id={index}/>

                                                                <button className="btn btn-danger float-right lesson-item-remove-btn" title="Remove" onClick={() => this.removeLesson(index)}><FontAwesomeIcon icon={faWindowClose} /></button>
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey="0">
                                                                <Card.Body>
                                                                    <SlideHandler addSlideChange={this.addSlideHandler} action="add" id={index}/>
                                                                    {this.state.lessons[index].slides ?
                                                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                                                            <Droppable droppableId="slides">
                                                                                {(provided) => (
                                                                                    <div
                                                                                        className="slide-container mt-3"
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        {this.state.lessons[index].slides.map((item, index) => (
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
                                                                                                            editSlideChange={this.editSlideHandler}
                                                                                                            currentSlideName={item.slideName}
                                                                                                            action="edit"
                                                                                                            id={index}
                                                                                                            showTitleValue={true}
                                                                                                        />

                                                                                                        <button className="btn btn-danger float-right lesson-item-remove-btn" title="Remove" onClick={() => this.removeSlide(index)}><FontAwesomeIcon icon={faWindowClose} /></button>
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
                                        <LessonHandler addLessonNameChange={this.addLessonNameHandler} action="add"/>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <div id="save-btn-container" className="float-right">
                                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>Save</button>
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
}

const mapStateToProps = (state) => {
    return {
        courseTitle: state.courseTitle,
        courseLogo: state.courseLogo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCourseTitle: (courseTitle) => dispatch({type: 'ADD_COURSE_TITLE', value: courseTitle}),
        addCourseLogo: (courseLogo) => dispatch({type: 'ADD_COURSE_LOGO', value: courseLogo}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
