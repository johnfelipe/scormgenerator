import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MultiSelect from "react-multi-select-component";

function DragDropAccordion(props) {

    let item = props.item;
    item.files = item.files.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
    const { index, IsAddAnswer, answer, correctAnswers } = props;

    const [editAnswer, setEditAnswer] = useState('');
    const [editAnswerCompareIndex, setEditAnswerCompareIndex] = useState('');
    const [isEditAnswer, setIsEditAnswer] = useState(false);
    const [collapseId, setCollapseId] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState(correctAnswers ? correctAnswers : []);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let reorderedFiles;

            if ((source.droppableId === 'answers-droppable') && (destination.droppableId === 'answers-droppable')) {
                reorderedFiles = reorder(
                    item.answers,
                    source.index,
                    destination.index
                );

                let answers = reorderedFiles;

                props.setQuestionAnswers(answers, index);
            }

            
        }
    }

    const answerOptions = () => {
        const options = [];
        const answerArray = item.answers;

        for (let key in answerArray) {
            options.push({label: answerArray[key].answer, value: key});
        }

        return options;
    }
    
    const selectOptions = answerOptions();

    useEffect(() => {
        let list = document.getElementsByClassName("dropdown-heading-value");
        if (list[0]) {
            list[0].innerHTML = "Select";
        }
    });

    return (
        <Accordion key={'accordion-drag-drop-question-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <span>Question </span>
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
                            props.setUpdateQuestionCompareIndex(index);
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
                        {
                            IsAddAnswer ?
                                <div className="drag-drop-control-input-wrapper mb-1 mt-3 mb-3">
                                    <div className="drag-drop-control-input-label">
                                        <span>Add:&nbsp;</span>
                                    </div>
                                    <div className="drag-drop-control-input">
                                        <input
                                            id="answer"
                                            name="answer"
                                            type="text"
                                            placeholder="Type answer here. . ."
                                            onChange={(event) => props.setAnswer(event.target.value)}
                                            value={answer}
                                        />
                                    </div>
                                    <div className="drag-drop-control-button">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm mr-1"
                                            onClick={() => {
                                                const isEmpty = document.getElementById("answer");
                                                
                                                if (isEmpty.value !== "") {
                                                    props.addAnswer(answer, index, false);
                                                    props.setAnswer('');
                                                    props.setIsAddAnswer(false);
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                props.setAnswer('');
                                                props.setIsAddAnswer(false);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </button>
                                    </div>
                                </div>
                            :
                                <div className="drag-drop-question-action-button m-0 mt-2 mb-2 row">
                                    <div className="col-md-6 p-0">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={() => {
                                                props.setIsAddAnswer(true);
                                            }}
                                        >
                                            Add answers
                                        </button>
                                    </div>
                                    <div className="col-md-6 p-0">
                                        {item.answers.length > 0 &&
                                            <OverlayTrigger
                                                key="top"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id='tooltip-top'>
                                                        <span>Select one or more correct answer.</span>
                                                    </Tooltip>
                                                }
                                            >
                                                <span>
                                                    <MultiSelect
                                                        options={selectOptions}
                                                        value={selectedAnswers}
                                                        onChange={(e) => {
                                                            setSelectedAnswers(e);
                                                            props.setCorrectAnswer(true, index, e);
                                                            sessionStorage.setItem("selectedAnswers", JSON.stringify(e));
                                                        }}
                                                        labelledBy={"Select"}
                                                        disableSearch={true}
                                                    />
                                                </span>
                                            </OverlayTrigger>
                                        }
                                    </div>
                                </div>
                        }
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="answers-droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            item.answers.length > 0 ?
                                                <ul className="drag-drop-question-list list-unstyled">
                                                    {item.answers.map((item, answerIndex) => (
                                                        <Draggable
                                                            key={'drag-drop-question-answers-list-item-key-' + answerIndex}
                                                            draggableId={'drag-drop-question-answers-list-item-' + answerIndex}
                                                            index={answerIndex}
                                                        >
                                                            {(provided) => (
                                                                <li
                                                                    className="drag-drop-question-list-item mb-3"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {
                                                                        isEditAnswer && editAnswerCompareIndex === answerIndex ?
                                                                            <div className="drag-drop-control-input-wrapper mb-1 mt-3 mb-3">
                                                                                <div className="drag-drop-control-input-label">
                                                                                    <span>Edit:&nbsp;</span>
                                                                                </div>
                                                                                <div className="drag-drop-control-input">
                                                                                    <input
                                                                                        id="answer"
                                                                                        name="answer"
                                                                                        type="text"
                                                                                        placeholder="Type answer here. . ."
                                                                                        onChange={(event) => setEditAnswer(event.target.value)}
                                                                                        value={editAnswer}
                                                                                    />
                                                                                </div>
                                                                                <div className="drag-drop-control-button">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-success btn-sm mr-1"
                                                                                        onClick={() => {
                                                                                            const isEmpty = document.getElementById("answer");
                                                                                            
                                                                                            if (isEmpty.value !== "") {
                                                                                                props.editAnswer(editAnswer, index, answerIndex);
                                                                                                setEditAnswer('');
                                                                                                setIsEditAnswer(false);
                                                                                                setEditAnswerCompareIndex('');
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            <div id="drag-drop-feature-answer-list-item" className="row mb-0 border rounded">
                                                                                <div id="drag-drop-feature-answer-list-item-answer" className="p-0 col-md-7" title={item.answer}>
                                                                                    {item.answer}
                                                                                </div>
                                                                                <div className="col-md-5 p-0 drag-drop-feature-answer-list-item-action-buttons text-right">
                                                                                    <button
                                                                                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setEditAnswer(item.answer);
                                                                                            setIsEditAnswer(true);
                                                                                            setEditAnswerCompareIndex(answerIndex);
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faEdit}/>
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            props.deleteAnswer(index, answerIndex);
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTrash}/>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                    }
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                </ul>
                                            :
                                                <div><span>No answer/s added.</span></div>
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default DragDropAccordion;
