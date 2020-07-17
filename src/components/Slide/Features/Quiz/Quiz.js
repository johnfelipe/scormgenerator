import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { objectHelpers } from '../../../../helpers';

// components
import QuizAccordion from './QuizAccordion';
import ColorPicker from '../../../Common/ColorPicker';

function Quiz(props) {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [updateQuestion, setUpdateQuestion] = useState('');
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [IsAddAnswer, setIsAddAnswer] = useState(false);
    const [filesExist, setFilesExist] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor;

    const addQuestion = (value) => {
        const currentColumnObj = currentColumn;

        const question = {
            question: value,
            answers: [],
            files: [],
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

    const addImageQuestion = (imgObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            img: imgObj,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addAudioQuestion = (audioObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            audio: audioObj,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addVideoQuestion = (videoObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            video: videoObj,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addVideoQuestionCaption = (captionObj, questionIndex) => {
        const currentColumnObj = currentColumn;
        const doesExist = objectHelpers.doesObjectInArrayExist(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');

        if (doesExist) {
            const index = objectHelpers.findObjectIndexInArray(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[index].video.caption = captionObj;
        } else {
            alert('PLease upload a video first!');
        }

        props.setColumn(currentColumnObj);
    }

    const deleteQuestionFile = (index, questionIndex) => {
        document.getElementById("question-files-uploader").value = "";

        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.splice(index, 1);

        if (currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.length === 0) {
            setFilesExist(false);
        }

        props.setColumn(currentColumnObj);
    }

    const deleteQuestionVideoVttFile = (questionIndex) => {
        document.getElementById("question-files-uploader").value = "";

        const currentColumnObj = currentColumn;
        const doesExist = objectHelpers.doesObjectInArrayExist(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');

        if (doesExist) {
            const index = objectHelpers.findObjectIndexInArray(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');
            delete currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[index].video.caption;
        } else {
            alert('PLease upload a video first!');
        }

        props.setColumn(currentColumnObj);
    }

    const setQuestionLabelClass = (labelClass) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.questionLabelClass = labelClass;

        props.setColumn(currentColumnObj);  
    }

    const setQuestionBackgroundColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor = color;

        props.setColumn(currentColumnObj);
    }

    const setQuizTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.quizTextColor = color;

        props.setColumn(currentColumnObj);
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
                <div className="sg-control-content">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Question/s</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <ul style={{ listStyle: 'none' }} className="list-group quiz-question-list">
                                    {
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                                <>
                                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                        <li key={'number-' + index} className="quiz-question-list-item">
                                                            {
                                                                isEditQuestion === false ?
                                                                    <QuizAccordion
                                                                        index={index}
                                                                        item={item}
                                                                        deleteQuestion={deleteQuestion}
                                                                        setIsEditQuestion={setIsEditQuestion}
                                                                        setUpdateQuestion={setUpdateQuestion}
                                                                        setAnswer={setAnswer}
                                                                        addAnswer={addAnswer}
                                                                        setIsAddAnswer={setIsAddAnswer}
                                                                        setCorrectAnswer={setCorrectAnswer}
                                                                        IsAddAnswer={IsAddAnswer}
                                                                        answer={answer}
                                                                        addImageQuestion={addImageQuestion}
                                                                        addAudioQuestion={addAudioQuestion}
                                                                        addVideoQuestion={addVideoQuestion}
                                                                        addVideoQuestionCaption={addVideoQuestionCaption}
                                                                        deleteQuestionFile={deleteQuestionFile}
                                                                        deleteQuestionVideoVttFile={deleteQuestionVideoVttFile}
                                                                        setFilesExist={setFilesExist}
                                                                    />
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
                    <label>Customize Question</label>
                </div>
                <div className="sg-control-input sg-control-input mt-3">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Label Border</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionLabelClass}
                                    onChange={(event) => setQuestionLabelClass(event.target.value)}
                                    className="form-control-plaintext border border-dark rounded"
                                >
                                    <option value="rounded-circle">&nbsp;Rounded Circle</option>
                                    <option value="rounded">&nbsp;Rounded</option>
                                    <option value="rounded-0">&nbsp;None</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.quizTextColor}
                                    onChange={(event) => setQuizTextColor(event.target.value)}
                                    className="form-control-plaintext border border-dark rounded"
                                >
                                    <option value="text-black">&nbsp;White</option>
                                    <option value="text-white">&nbsp;Black</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label quiz-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input quiz-background-color-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPicker ? setShowPicker(false) : setShowPicker(true)} style={{ background: currentBackgroundColor, cursor: 'pointer' }}>
                                    <span className="text-white h-100 w-100">{currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor}</span>
                                </div>
                            </div>
                        </li>
                        {
                            filesExist &&
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>Files Position</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <select
                                        value={currentColumn.content[currentColumnContentIndex][contentIndex].class}
                                        onChange={(event) => props.setFeatureClass(event, contentIndex)}
                                        className="form-control-plaintext border border-dark rounded"
                                    >
                                        <option value="question-files-left">&nbsp;Left</option>
                                        <option value="question-files-right">&nbsp;Right</option>
                                    </select>
                                </div>
                            </li>
                        }
                        {/* <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>ID</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureId(event, contentIndex)}
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].id && currentColumn.content[currentColumnContentIndex][contentIndex].id
                                    }
                                />
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
            <ColorPicker
                classNames="position-absolute quiz-color-picker"
                showPicker={showPicker}
                setBackgroundColor={setQuestionBackgroundColor}
                defaultColor={currentBackgroundColor}
            />
        </div>
    )
}

export default Quiz;
