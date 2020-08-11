import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowAltCircleRight, faUndo } from '@fortawesome/free-solid-svg-icons';
import { objectHelpers } from '../../../../helpers';

// components
import DragDropAccordion from './DragDropAccordion';
import ColorPicker from '../../../Common/ColorPicker';

function DragDrop(props) {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [updateQuestion, setUpdateQuestion] = useState('');
    const [updateQuestionCompareIndex, setUpdateQuestionCompareIndex] = useState('');
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [IsAddAnswer, setIsAddAnswer] = useState(false);
    const [filesExist, setFilesExist] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropBackgroundColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropBackgroundColor;
    const correctAnswers = props.correctAnswers;

    const addQuestion = (value) => {
        const currentColumnObj = currentColumn;

        const question = {
            question: value,
            answers: [],
            files: [],
            explanation: { content: '', visibility: 'show' },
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

    const addAnswer = (value, questionIndex, correctAnswer) => {
        const currentColumnObj = currentColumn;

        const answer = {
            answer: value,
            correct: correctAnswer,
        }
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.push(answer);

        props.setColumn(currentColumnObj);
    }

    const editAnswer = (value, questionIndex, answerIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[answerIndex].answer = value;

        props.setColumn(currentColumnObj);
    }

    const deleteAnswer = (questionIndex, answerIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.splice(answerIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const setCorrectAnswer = (value, questionIndex, answerArray) => {
        const currentColumnObj = currentColumn;
        const selectCorrectAnswers = [];

        answerArray.forEach((item) => {
            selectCorrectAnswers.push(parseInt(item.value));
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[parseInt(item.value)].correct = value;
        });

        const arrayLength = currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.length;

        for (let i = 0; i < arrayLength; i++) {
            if (!selectCorrectAnswers.includes(i)) {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[i].correct = false;
            } 
        }

        props.setColumn(currentColumnObj);
    }

    const addImageQuestion = (imgObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            img: imgObj,
            label: '',
            weight: 0,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addAudioQuestion = (audioObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            audio: audioObj,
            label: '',
            weight: 1,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addVideoQuestion = (videoObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            video: videoObj,
            label: '',
            weight: 2,
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

    const setMultipleChoiceTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.multipleChoiceTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setQuestionFiles = (questionFilesArray, questionIndex) => {
        const currentColumnObj = currentColumn;
        console.log(questionFilesArray);

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files = questionFilesArray;

        props.setColumn(currentColumnObj);
    }

    const addFileLabel = (value, questionIndex, fileIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
    }

    const editFileLabel = (value, questionIndex, fileIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
    }

    const deleteFileLabel = (questionIndex, fileIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = '';

        props.setColumn(currentColumnObj);
    }

    const setExplanationVisibility = (value, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].explanation.visibility = value;

        props.setColumn(currentColumnObj);
    }

    const setQuestionAnswers = (questionAnswersArray, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers = questionAnswersArray;

        props.setColumn(currentColumnObj);
    }
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'multipleChoice')}>
                        <FontAwesomeIcon icon={faUndo}/>
                        <span>Reset</span>
                    </button>
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
                                <ul style={{ listStyle: 'none' }} className="list-group drag-drop-question-list">
                                    {
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                                <>
                                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                        <li key={'number-' + index} className="drag-drop-question-list-item mb-2">
                                                            {
                                                                isEditQuestion && updateQuestionCompareIndex === index ?
                                                                    <div className="drag-drop-control-input-wrapper">
                                                                        <div className="drag-drop-control-input-label">
                                                                            <span>{index+1}.</span>
                                                                        </div>
                                                                        <div className="drag-drop-control-input">
                                                                            <input
                                                                                id="question"
                                                                                name="question"
                                                                                type="text"
                                                                                placeholder="Type question here. . ."
                                                                                onChange={(event) => setUpdateQuestion(event.target.value)}
                                                                                value={updateQuestion}
                                                                            />
                                                                        </div>
                                                                        <div className="drag-drop-control-button">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => {
                                                                                    const isEmpty = document.getElementById("question");
                                                                                    
                                                                                    if (isEmpty.value !== "") {
                                                                                        editQuestion(updateQuestion, index);
                                                                                        setUpdateQuestion('');
                                                                                        setIsEditQuestion(false);
                                                                                        setUpdateQuestionCompareIndex('');
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    <DragDropAccordion
                                                                        index={index}
                                                                        item={item}
                                                                        deleteQuestion={deleteQuestion}
                                                                        setIsEditQuestion={setIsEditQuestion}
                                                                        setUpdateQuestion={setUpdateQuestion}
                                                                        setAnswer={setAnswer}
                                                                        editAnswer={editAnswer}
                                                                        deleteAnswer={deleteAnswer}
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
                                                                        setQuestionFiles={setQuestionFiles}
                                                                        addFileLabel={addFileLabel}
                                                                        editFileLabel={editFileLabel}
                                                                        deleteFileLabel={deleteFileLabel}
                                                                        contentIndex={contentIndex}
                                                                        setShowTextEditor={props.setShowTextEditor}
                                                                        setMChoiceIndex={props.setMChoiceIndex}
                                                                        setExplanationVisibility={setExplanationVisibility}
                                                                        setUpdateQuestionCompareIndex={setUpdateQuestionCompareIndex}
                                                                        setQuestionAnswers={setQuestionAnswers}
                                                                        correctAnswers={correctAnswers}
                                                                    />
                                                            }
                                                        </li>
                                                    ))}
                                                    <li className="drag-drop-question-list-item">
                                                        <div className="drag-drop-control-input-wrapper">
                                                            <div className="drag-drop-control-input-label">
                                                                <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                            </div>
                                                            <div className="drag-drop-control-input">
                                                                <input
                                                                    id="question"
                                                                    name="question"
                                                                    type="text"
                                                                    placeholder="Type question here. . ."
                                                                    onChange={(event) => setQuestion(event.target.value)}
                                                                    value={question}
                                                                />
                                                            </div>
                                                            <div className="drag-drop-control-button">
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
                                            <li className="drag-drop-question-list-item">
                                                <div className="drag-drop-control-input-wrapper">
                                                    <div className="drag-drop-control-input-label">
                                                        <span>1.</span>
                                                    </div>
                                                    <div className="drag-drop-control-input">
                                                        <input
                                                            id="question"
                                                            name="question"
                                                            type="text"
                                                            placeholder="Type question here. . ."
                                                            onChange={(event) => setQuestion(event.target.value)}
                                                            value={question}
                                                        />
                                                    </div>
                                                    <div className="drag-drop-control-button">
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
                                    className="form-control-plaintext border border-secondary rounded"
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
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.multipleChoiceTextColor}
                                    onChange={(event) => setMultipleChoiceTextColor(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="text-black">&nbsp;Black</option>
                                    <option value="text-white">&nbsp;White</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label drag-drop-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input drag-drop-background-color-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPicker ? setShowPicker(false) : setShowPicker(true)} style={{ background: currentBackgroundColor, cursor: 'pointer' }}>
                                    <span className="text-white h-100 w-100">{currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropBackgroundColor}</span>
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Element CSS</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowCssEditor(true, contentIndex)}>
                                                <span>Add CSS</span>
                                            </button>
                                            <input type="text" value="" disabled className="rounded"/>
                                        </div>
                                    </div>
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
                                        className="form-control-plaintext border border-secondary rounded"
                                    >
                                        <option value="question-files-left">&nbsp;Left</option>
                                        <option value="question-files-right">&nbsp;Right</option>
                                    </select>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <ColorPicker
                classNames="position-absolute drag-drop-color-picker"
                showPicker={showPicker}
                setBackgroundColor={setQuestionBackgroundColor}
                defaultColor={currentBackgroundColor}
            />
        </div>
    )
}

export default DragDrop