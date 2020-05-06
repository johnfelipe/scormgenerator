import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Formik } from "formik";
import * as Yup from 'yup';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

// components
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';
import ResourcesUpload from './ResourcesUpload';
import TranscriptUpload from './TranscriptUpload';
import AddGlossary from './AddGlossary';
import LessonHandler from '../Handlers/LessonHandler';
import SlideHandler from '../Handlers/SlideHandler';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
            courseLogo: '',
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
    }

    componentDidUpdate = () => {
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

    render() {
        return (
            <div className="container-fluid">
                <div id="generator-container">
                <Formik
                        initialValues={{ 
                        
                        }}

                        onSubmit={values => {
                        
                        }}
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
                                            <TextInput 
                                                placeholder="Type course name here . . ."
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <FileInput />
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
                                            <ResourcesUpload />
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <TranscriptUpload />
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
                                                                                                            <span class="btn pr-1">{item.slideName}</span>
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
            </div>
        )
    }
}

export default Main;
