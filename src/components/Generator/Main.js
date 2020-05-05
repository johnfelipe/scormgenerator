import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
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
import LessonHandler from './LessonHandler';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
            courseLogo: '',
            navigationType: '',
            showProgressbar: '',
            lessons: [],
        };
        
        this.addLessonNameHandler = this.addLessonNameHandler.bind(this);
        this.editLessonNameHandler = this.editLessonNameHandler.bind(this);
    }

    componentDidUpdate = () => {
        console.log(this.state.lessons);
    }

    addLessonNameHandler = (name) => {
        console.log(name);
        const lessonObj = {'lesson_name': name};
        this.setState({
            lessons: [...this.state.lessons, lessonObj],
        })
    }

    editLessonNameHandler = (name, index) => {
        console.log(name);
        console.log(index);
          
        const lessonObj = {
            ...this.state.lessons[index]
        };
        lessonObj.lesson_name = name;

        const lessons = [...this.state.lessons];
        lessons[index] = lessonObj;

        this.setState({
            lessons: lessons,
        })
    }

    removeItem = (lessonName, index) => {
        console.log('Clicked!');
        console.log(lessonName);
        console.log(index);
        console.log(this.state.lessons);

        const lessonArray = [...this.state.lessons];
        lessonArray.splice(index, 1);

        console.log(lessonArray);

        this.setState({
            lessons: lessonArray,
        })
    }

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
                                                        <span>{item.lesson_name}</span>
                                                    </Accordion.Toggle>
                                                    <LessonHandler editLessonNameChange={this.editLessonNameHandler} action="edit" currentLessonName={item.lesson_name} id={index}/>
                                                    <button className="btn btn-danger float-right lesson-item-remove-btn" title="Remove" onClick={() => this.removeItem(item.lesson_name, index)}><FontAwesomeIcon icon={faWindowClose} /></button>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>Slides will be here</Card.Body>
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
