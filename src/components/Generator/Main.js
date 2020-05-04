import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

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
import AddLesson from './AddLesson';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
            courseLogo: '',
            navigationType: '',
            showProgressbar: '',
            lesson: [],
        };
        
        this.addLessonNameHandler = this.addLessonNameHandler.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidUpdate = () => {
        console.log(this.state.lesson);
    }

    addLessonNameHandler = (name) => {
        console.log(name);
        const lessonObj = {'lesson_name': name};
        this.setState({
            lesson: [...this.state.lesson, lessonObj],
        })
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        lesson: 'lesson',
    };

    getList = id => this.state[this.id2List[id]];

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
            const lesson = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            let state = { lesson };

            this.setState(state);
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <div id="generator-container">
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
                                <CheckBoxInput />
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
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId="lesson">
                                        {(provided) => (
                                            <div
                                                className="lesson-draggable-container"
                                                ref={provided.innerRef}>
                                                {this.state.lesson.map((item, index) => (
                                                    <Draggable
                                                        key={index}
                                                        draggableId={'' + index}
                                                        index={index}>
                                                        {(provided) => (
                                                            <Accordion
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Card>
                                                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                        {item.lesson_name}
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse eventKey="0">
                                                                        <Card.Body>Slides will be here</Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Card>
                                                            </Accordion>
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
                            <AddLesson addLessonNameChange={this.addLessonNameHandler}/>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div id="save-btn-container" className="float-right">
                                <button type="button" className="btn btn-success">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
