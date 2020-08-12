import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowAltCircleRight, faUndo } from '@fortawesome/free-solid-svg-icons';

// components
import DragDropAccordion from './DragDropAccordion';
import ColorPicker from '../../../Common/ColorPicker';

function DragDrop(props) {

    const [instruction, setInstruction] = useState('');
    const [question, setQuestion] = useState('');
    const [updateInstruction, setUpdateInstruction] = useState('');
    const [updateInstructionCompareIndex, setUpdateInstructionCompareIndex] = useState('');
    const [isEditInstruction, setIsEditInstruction] = useState(false);
    const [isAddQuestion, setIsAddQuestion] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropBackgroundColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropBackgroundColor;

    const addInstruction = (value) => {
        const currentColumnObj = currentColumn;

        const instruction = {
            instruction: value,
            questions: [],
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(instruction);

        props.setColumn(currentColumnObj);
    }

    const editInstruction = (value, instructionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[instructionIndex].instruction = value;

        props.setColumn(currentColumnObj);
    }

    const deleteInstruction = (instructionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(instructionIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const addQuestion = (value, instructionIndex, correctAnswer) => {
        const currentColumnObj = currentColumn;

        const question = {
            question: value,
            correct: correctAnswer,
        }
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[instructionIndex].questions.push(question);

        props.setColumn(currentColumnObj);
    }

    const editQuestion = (value, instructionIndex, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[instructionIndex].questions[questionIndex].question = value;

        props.setColumn(currentColumnObj);
    }

    const deleteQuestion = (instructionIndex, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[instructionIndex].questions.splice(questionIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const setDragDropLabelClass = (labelClass) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.dragDropLabelClass = labelClass;

        props.setColumn(currentColumnObj);  
    }

    const setDragDropBackgroundColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.dragDropBackgroundColor = color;

        props.setColumn(currentColumnObj);
    }

    const setDragDropTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.dragDropTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setQuestionAnswers = (questionAnswersArray, instructionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[instructionIndex].questions = questionAnswersArray;

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
                                                                isEditInstruction && updateInstructionCompareIndex === index ?
                                                                    <div className="drag-drop-control-input-wrapper">
                                                                        <div className="drag-drop-control-input-label">
                                                                            <span>{index+1}.</span>
                                                                        </div>
                                                                        <div className="drag-drop-control-input">
                                                                            <input
                                                                                id="instruction"
                                                                                name="instruction"
                                                                                type="text"
                                                                                placeholder="Type instruction here. . ."
                                                                                onChange={(event) => setUpdateInstruction(event.target.value)}
                                                                                value={updateInstruction}
                                                                            />
                                                                        </div>
                                                                        <div className="drag-drop-control-button">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => {
                                                                                    const isEmpty = document.getElementById("instruction");
                                                                                    
                                                                                    if (isEmpty.value !== "") {
                                                                                        editInstruction(updateInstruction, index);
                                                                                        setUpdateInstruction('');
                                                                                        setIsEditInstruction(false);
                                                                                        setUpdateInstructionCompareIndex('');
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
                                                                        deleteInstruction={deleteInstruction}
                                                                        setIsEditInstruction={setIsEditInstruction}
                                                                        setUpdateInstruction={setUpdateInstruction}
                                                                        setQuestion={setQuestion}
                                                                        editQuestion={editQuestion}
                                                                        deleteQuestion={deleteQuestion}
                                                                        addQuestion={addQuestion}
                                                                        setIsAddQuestion={setIsAddQuestion}
                                                                        isAddQuestion={isAddQuestion}
                                                                        question={question}
                                                                        setShowTextEditor={props.setShowTextEditor}
                                                                        setMChoiceIndex={props.setMChoiceIndex}
                                                                        setUpdateInstructionCompareIndex={setUpdateInstructionCompareIndex}
                                                                        setQuestionAnswers={setQuestionAnswers}
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
                                                                    id="instruction"
                                                                    name="instruction"
                                                                    type="text"
                                                                    placeholder="Type instruction here. . ."
                                                                    onChange={(event) => setInstruction(event.target.value)}
                                                                    value={instruction}
                                                                />
                                                            </div>
                                                            <div className="drag-drop-control-button">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() => {
                                                                        const isEmpty = document.getElementById("instruction");
                                                                        
                                                                        if (isEmpty.value !== "") {
                                                                            addInstruction(instruction);
                                                                            setInstruction('');
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
                                                            id="instruction"
                                                            name="instruction"
                                                            type="text"
                                                            placeholder="Type instruction here. . ."
                                                            onChange={(event) => setInstruction(event.target.value)}
                                                            value={instruction}
                                                        />
                                                    </div>
                                                    <div className="drag-drop-control-button">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                const isEmpty = document.getElementById("instruction");
                                                                
                                                                if (isEmpty.value !== "") {
                                                                    addInstruction(instruction);
                                                                    setInstruction('');
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
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropLabelClass}
                                    onChange={(event) => setDragDropLabelClass(event.target.value)}
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
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropTextColor}
                                    onChange={(event) => setDragDropTextColor(event.target.value)}
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
                    </ul>
                </div>
            </div>
            <ColorPicker
                classNames="position-absolute drag-drop-color-picker"
                showPicker={showPicker}
                setBackgroundColor={setDragDropBackgroundColor}
                defaultColor={currentBackgroundColor}
            />
        </div>
    )
}

export default DragDrop