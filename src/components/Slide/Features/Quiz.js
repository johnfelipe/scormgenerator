import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowAltCircleRight, faEdit, faTrash, faCheck, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Card } from 'react-bootstrap';

function Quiz(props) {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [updateQuestion, setUpdateQuestion] = useState('');
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [IsAddAnswer, setIsAddAnswer] = useState(false);
    const [collapseId, setCollapseId] = useState(false);

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;

    const addQuestion = (value) => {
        const currentColumnObj = currentColumn;

        const question = {
            question: value,
            answers: [],
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(question);

        props.setColumn(currentColumnObj);
    }

    const editQuestion = (value, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].question = value;

        props.setColumn(currentColumnObj);
    }

    const deleteQuestion = (questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(questionIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const addAnswer = (value, questionIndex) => {
        const currentColumnObj = currentColumn;

        const answer = {
            answer: value,
            correct: '',
        }
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.push(answer);

        props.setColumn(currentColumnObj);
    }

    const setCorrectAnswer = (value, questionIndex, answerIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[answerIndex].correct = value;

        const arrayLength = currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.length;

        for (let i = 0; i < arrayLength; i++) {
            if (i !== answerIndex) {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[i].correct = false;
            }
        }

        props.setColumn(currentColumnObj);
    }

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => props.deleteFeature(contentIndex)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header">
                    <label>Content Setup</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Question/s</span>
                            </div>
                            <div className="sg-control-input-list-input sg-control-input-list-input-height-5">
                                <ul style={{ listStyle: 'none' }} className="list-group quiz-question-list">
                                    {
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                                <>
                                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                        <li key={'number-' + index} className="quiz-question-list-item">
                                                            {
                                                                isEditQuestion === false ?
                                                                    <Accordion key={'accordion-quiz-question-' + index}>
                                                                        <Card>
                                                                            <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)}>
                                                                                <span>{index+1 + '. '}</span>
                                                                                <span className="ml-2">{item.question}</span>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                                                                                    onClick={() => {
                                                                                        deleteQuestion(index)
                                                                                    }}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faTrash}/>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                                                                                    onClick={() => {
                                                                                        setIsEditQuestion(true);
                                                                                        setUpdateQuestion(item.question);
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
                                                                                                        onChange={(event) => setAnswer(event.target.value)}
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
                                                                                                                addAnswer(answer, index);
                                                                                                                setAnswer('');
                                                                                                                setIsAddAnswer(false);
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
                                                                                                    setIsAddAnswer(true);
                                                                                                }}
                                                                                            >
                                                                                                Add
                                                                                            </button>
                                                                                    }
                                                                                    {
                                                                                        item.answers.length > 0 ?
                                                                                            <ul style={{ listStyle: 'none' }} className="list-group quiz-question-list">
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
                                                                                                                                        setCorrectAnswer(true, index, answerIndex)
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
                                                                                                                                        setCorrectAnswer(true, index, answerIndex)
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
                                                                                                                                        setCorrectAnswer(true, index, answerIndex)
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
                                                                                                                                        setCorrectAnswer(true, index, answerIndex)
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
                                                                :
                                                                    <div className="quiz-control-input-wrapper">
                                                                        <div className="quiz-control-input-label">
                                                                            <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length}.</span>
                                                                        </div>
                                                                        <div className="quiz-control-input">
                                                                            <input
                                                                                id="question"
                                                                                name="question"
                                                                                type="text"
                                                                                placeholder="Type question here. . ."
                                                                                onChange={(event) => setUpdateQuestion(event.target.value)}
                                                                                value={updateQuestion}
                                                                            />
                                                                        </div>
                                                                        <div className="quiz-control-button">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => {
                                                                                    const isEmpty = document.getElementById("question");
                                                                                    
                                                                                    if (isEmpty.value !== "") {
                                                                                        editQuestion(updateQuestion, index);
                                                                                        setUpdateQuestion('');
                                                                                        setIsEditQuestion(false);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </li>
                                                    ))}
                                                    <li className="quiz-question-list-item mt-2">
                                                        <div className="quiz-control-input-wrapper">
                                                            <div className="quiz-control-input-label">
                                                                <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                            </div>
                                                            <div className="quiz-control-input">
                                                                <input
                                                                    id="question"
                                                                    name="question"
                                                                    type="text"
                                                                    placeholder="Type question here. . ."
                                                                    onChange={(event) => setQuestion(event.target.value)}
                                                                    value={question}
                                                                />
                                                            </div>
                                                            <div className="quiz-control-button">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() => {
                                                                        const isEmpty = document.getElementById("question");
                                                                        
                                                                        if (isEmpty.value !== "") {
                                                                            addQuestion(question);
                                                                            setQuestion('');
                                                                        }
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </>
                                        :
                                            <li className="quiz-question-list-item">
                                                <div className="quiz-control-input-wrapper">
                                                    <div className="quiz-control-input-label">
                                                        <span>1.</span>
                                                    </div>
                                                    <div className="quiz-control-input">
                                                        <input
                                                            id="question"
                                                            name="question"
                                                            type="text"
                                                            placeholder="Type question here. . ."
                                                            onChange={(event) => setQuestion(event.target.value)}
                                                            value={question}
                                                        />
                                                    </div>
                                                    <div className="quiz-control-button">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                const isEmpty = document.getElementById("question");
                                                                
                                                                if (isEmpty.value !== "") {
                                                                    addQuestion(question);
                                                                    setQuestion('');
                                                                }
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>             
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Customize</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>ID</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureId(event, contentIndex)}
                                    value={ 
                                        typeof currentColumn != "undefined" ? 
                                            'content' in currentColumn && currentColumn.content.length > 0 ? 
                                            currentColumn.content[contentIndex].id 
                                            : 
                                            ''
                                        : 
                                        '' 
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Class</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureClass(event, contentIndex)}
                                    value={ 
                                        typeof currentColumn != "undefined" ? 
                                            'content' in currentColumn && currentColumn.content.length > 0 ? 
                                            currentColumn.content[contentIndex].class 
                                            : 
                                            ''
                                        : 
                                        '' 
                                    }
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Quiz;
