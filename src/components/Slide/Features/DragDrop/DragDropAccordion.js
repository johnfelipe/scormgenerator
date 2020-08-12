import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragDropAccordion(props) {

    let item = props.item;
    const { index, isAddQuestion, question } = props;

    const [editQuestion, setEditQuestion] = useState('');
    const [editQuestionCompareIndex, setEditQuestionCompareIndex] = useState('');
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [collapseId, setCollapseId] = useState(false);
    const [collapseAccordion, setCollapseAccordion] = useState(false);
    const [currentCollapseAccordion, setCurrentCollapseAccordion] = useState(-1);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    const accordionClick = (currentCollapseAccordion, index) => {

        if (index === currentCollapseAccordion) {
            currentCollapseAccordion = false;
            setCurrentCollapseAccordion(-1);
        } else {
            setCurrentCollapseAccordion(index);
            currentCollapseAccordion = true;
        }

        setCollapseAccordion(currentCollapseAccordion);
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
            let reorderedArray;

            if ((source.droppableId === 'questions-droppable') && (destination.droppableId === 'questions-droppable')) {
                reorderedArray = reorder(
                    item.questions,
                    source.index,
                    destination.index
                );

                let questions = reorderedArray;

                props.setQuestionAnswers(questions, index);
            }

            
        }
    }

    return (
        <Accordion key={'accordion-drag-drop-question-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <span>Instruction </span>
                    <span>&nbsp;{index+1}</span>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.deleteInstruction(index)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.setIsEditInstruction(true);
                            props.setUpdateInstruction(item.instruction);
                            props.setUpdateInstructionCompareIndex(index);
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
                        <span>Instruction: <strong>{item.instruction}</strong></span>
                        {
                            isAddQuestion ?
                                <div className="drag-drop-control-input-wrapper mb-1 mt-3 mb-3">
                                    <div className="drag-drop-control-input-label">
                                        <span>Add:&nbsp;</span>
                                    </div>
                                    <div className="drag-drop-control-input">
                                        <input
                                            id="question"
                                            name="question"
                                            type="text"
                                            placeholder="Type question here. . ."
                                            onChange={(event) => props.setQuestion(event.target.value)}
                                            value={question}
                                        />
                                    </div>
                                    <div className="drag-drop-control-button">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm mr-1"
                                            onClick={() => {
                                                const isEmpty = document.getElementById("question");
                                                
                                                if (isEmpty.value !== "") {
                                                    props.addQuestion(question, index, false);
                                                    props.setQuestion('');
                                                    props.setIsAddQuestion(false);
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                props.setQuestion('');
                                                props.setIsAddQuestion(false);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </button>
                                    </div>
                                </div>
                            :
                                <div className="drag-drop-question-action-button m-0 mt-2 mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => {
                                            props.setIsAddQuestion(true);
                                        }}
                                    >
                                        Add questions
                                    </button>
                                </div>
                        }
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="questions-droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            item.questions.length > 0 ?
                                                <ul className="drag-drop-question-list list-unstyled">
                                                    {item.questions.map((item, questionIndex) => (
                                                        <Draggable
                                                            key={'drag-drop-question-answers-list-item-key-' + questionIndex}
                                                            draggableId={'drag-drop-question-answers-list-item-' + questionIndex}
                                                            index={questionIndex}
                                                        >
                                                            {(provided) => (
                                                                <li
                                                                    className="drag-drop-question-list-item mb-3"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {
                                                                        isEditQuestion && editQuestionCompareIndex === questionIndex ?
                                                                            <div className="drag-drop-control-input-wrapper mb-1 mt-3 mb-3">
                                                                                <div className="drag-drop-control-input-label">
                                                                                    <span>Edit:&nbsp;</span>
                                                                                </div>
                                                                                <div className="drag-drop-control-input">
                                                                                    <input
                                                                                        id="question"
                                                                                        name="question"
                                                                                        type="text"
                                                                                        placeholder="Type question here. . ."
                                                                                        onChange={(event) => setEditQuestion(event.target.value)}
                                                                                        value={editQuestion}
                                                                                    />
                                                                                </div>
                                                                                <div className="drag-drop-control-button">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-success btn-sm mr-1"
                                                                                        onClick={() => {
                                                                                            const isEmpty = document.getElementById("question");
                                                                                            
                                                                                            if (isEmpty.value !== "") {
                                                                                                props.editQuestion(editQuestion, index, questionIndex);
                                                                                                setEditQuestion('');
                                                                                                setIsEditQuestion(false);
                                                                                                setEditQuestionCompareIndex('');
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            <>
                                                                                <div
                                                                                    id="drag-drop-feature-answer-list-item"
                                                                                    className="row mb-0 border rounded-top"
                                                                                    onClick={() => {
                                                                                        accordionClick(currentCollapseAccordion, questionIndex);
                                                                                    }}
                                                                                >
                                                                                    <div id="drag-drop-feature-answer-list-item-answer" className="p-0 col-md-8" title={item.question}>
                                                                                        {item.question}
                                                                                    </div>
                                                                                    <div className="col-md-4 p-0 drag-drop-feature-answer-list-item-action-buttons text-right">
                                                                                        <span className="mr-2">
                                                                                            <FontAwesomeIcon
                                                                                                icon={collapseAccordion && currentCollapseAccordion === questionIndex ?
                                                                                                    faCaretUp
                                                                                                :
                                                                                                    faCaretDown
                                                                                                }
                                                                                            />
                                                                                        </span>
                                                                                        <button
                                                                                            className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                setEditQuestion(item.question);
                                                                                                setIsEditQuestion(true);
                                                                                                setEditQuestionCompareIndex(questionIndex);
                                                                                            }}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faEdit}/>
                                                                                        </button>
                                                                                        <button
                                                                                            className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                props.deleteQuestion(index, questionIndex);
                                                                                            }}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faTrash}/>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className={collapseAccordion && currentCollapseAccordion === questionIndex ?
                                                                                        "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1"
                                                                                    :
                                                                                        "d-none multiple-choice-question-action-button border py-2 px-1"
                                                                                    }
                                                                                >
                                                                                    <span>Sample</span>
                                                                                </div>
                                                                            </>
                                                                    }
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                </ul>
                                            :
                                                <div><span>No question/s added.</span></div>
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
