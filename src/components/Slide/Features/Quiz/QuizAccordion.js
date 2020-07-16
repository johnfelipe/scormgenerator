import React, { useState } from 'react';
import { Accordion, Card, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCheck, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';

function QuizAccordion(props) {

    const index = props.index;
    const item = props.item;
    const IsAddAnswer = props.IsAddAnswer;
    const answer = props.answer;
    
    const [collapseId, setCollapseId] = useState(false);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    const handleFileChange = (e, index) => {
        e.preventDefault();
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {

            if (~files[0].type.indexOf('image')) {
                const imgObj = {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    url: reader.result,
                    lastModified: files[0].lastModified,
                }
    
                props.addImageQuestion(imgObj, index);
            } else if (~files[0].type.indexOf('audio')) {
                const audioObj = {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    url: reader.result,
                    lastModified: files[0].lastModified,
                }
    
                props.addAudioQuestion(audioObj, index);
            } else if (~files[0].type.indexOf('video')) {
                const videoObj = {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    url: reader.result,
                    lastModified: files[0].lastModified,
                    caption: '',
                }
    
                props.addVideoQuestion(videoObj, index);
            } else if (files[0].type === "") {
                const fileExt = files[0].name.split(".");

                if (fileExt[1] === 'vtt') {
                    const captionUrl = reader.result;
        
                    props.addVideoQuestionCaption(captionUrl, index);
                }
            }
        }
    }

    return (
        <Accordion key={'accordion-quiz-question-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <span>Question no.</span>
                    <span>&nbsp;{index+1}</span>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.deleteQuestion(index)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.setIsEditQuestion(true);
                            props.setUpdateQuestion(item.question);
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <span className="float-right mr-2">
                        <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body className="p-2">
                        <span>Question: <strong>{item.question}</strong></span>
                        <Tabs defaultActiveKey="answers" id="question-answers-files-tabs">
                            <Tab eventKey="answers" title="Answers">
                                {
                                    IsAddAnswer ?
                                        <div className="quiz-control-input-wrapper mb-1 mt-3">
                                            <div className="quiz-control-input-label">
                                                <span>Add:&nbsp;</span>
                                            </div>
                                            <div className="quiz-control-input">
                                                <input
                                                    id="answer"
                                                    name="answer"
                                                    type="text"
                                                    placeholder="Type answer here. . ."
                                                    onChange={(event) => props.setAnswer(event.target.value)}
                                                    value={answer}
                                                />
                                            </div>
                                            <div className="quiz-control-button">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        const isEmpty = document.getElementById("answer");
                                                        
                                                        if (isEmpty.value !== "") {
                                                            props.addAnswer(answer, index);
                                                            props.setAnswer('');
                                                            props.setIsAddAnswer(false);
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <div className="quiz-question-action-button mt-3">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                onClick={() => {
                                                    props.setIsAddAnswer(true);
                                                }}
                                            >
                                                Add answers
                                            </button>
                                        </div>
                                }
                                {
                                    item.answers.length > 0 ?
                                        <ul className="quiz-question-list">
                                            {item.answers.map((item, answerIndex) => (
                                                <li key={Math.random()} className="quiz-question-list-item">
                                                    <span key={'quiz-feature-answer-list-item-span-' + answerIndex}>
                                                        <span key={'quiz-feature-answer-list-item-' + answerIndex}>
                                                            {item.answer}&nbsp;
                                                                {
                                                                    item.correct === '' ?
                                                                        <button
                                                                            title="Mark as answer"
                                                                            className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                            onClick={() => {
                                                                                props.setCorrectAnswer(true, index, answerIndex)
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon icon={faCheck}/>
                                                                        </button>
                                                                    :
                                                                        item.correct &&
                                                                        <span><FontAwesomeIcon icon={faCheck}/></span>
                                                                }
                                                        </span>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    :
                                        <div><span>No answer/s added.</span></div>
                                }
                            </Tab>
                            <Tab eventKey="files" title="Files">
                                <div className="quiz-question-action-button mt-3">
                                    <label className="input-group-btn" style={{ cursor: 'pointer' }}>
                                        <span className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1">
                                            Add files<input type="file" style={{ display: "none"}} onChange={(e) => handleFileChange(e, index)}/>
                                        </span>
                                    </label>
                                </div>
                                {
                                    item.files.length > 0 ?
                                        <ul className="quiz-question-files-list list-unstyled">
                                            {item.files.map((file, fileIndex) => (
                                                <li key={Math.random()} className="quiz-question-files-list-item">
                                                    <div id="quiz-question-file-item" className="row">
                                                        <div className="col-md-11 pl-0 quiz-question-file-item-label">
                                                            {file.img && file.img.name}
                                                            {file.audio && file.audio.name}
                                                            {file.video && file.video.name}
                                                        </div>
                                                        <div className="col-md-1 p-0 quiz-question-file-item-delete" onClick={() => {props.deleteQuestionFile(fileIndex, index)}}>
                                                            <span><FontAwesomeIcon icon={faTimes}/></span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    :
                                        <div><span>No file/s added.</span></div>
                                }
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default QuizAccordion;
