import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCheck, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <Accordion key={'accordion-quiz-question-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)}>
                    <span>{index+1 + '. '}</span>
                    <span className="ml-2">{item.question}</span>
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
                        {
                            IsAddAnswer ?
                                <div className="quiz-control-input-wrapper mb-1">
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
                                item.answers.length !== 4 &&
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                    onClick={() => {
                                        props.setIsAddAnswer(true);
                                    }}
                                >
                                    Add
                                </button>
                        }
                        {
                            item.answers.length > 0 ?
                                <ul className="quiz-question-list list-unstyled">
                                    {item.answers.map((item, answerIndex) => (
                                        <li key={Math.random()} className="quiz-question-list-item">
                                            <span key={'quiz-feature-answer-list-item-span-' + answerIndex}>
                                                {
                                                    answerIndex === 0 && 
                                                    <span key={'quiz-feature-answer-list-item-' + answerIndex}>
                                                        {'a. ' + item.answer}&nbsp;
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
                                                }
                                                {
                                                    answerIndex === 1 && 
                                                    <span key={'quiz-feature-answer-list-item-' + answerIndex}>
                                                        {'b. ' + item.answer}&nbsp;
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
                                                }
                                                {
                                                    answerIndex === 2 && 
                                                    <span key={'quiz-feature-answer-list-item-' + answerIndex}>
                                                        {'c. ' + item.answer}&nbsp;
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
                                                }
                                                {
                                                    answerIndex === 3 && 
                                                    <span key={'quiz-feature-answer-list-item-' + answerIndex}>
                                                        {'d. ' + item.answer}&nbsp;
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
                                                }
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            :
                                <div><span>No answer/s added.</span></div>
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default QuizAccordion;
