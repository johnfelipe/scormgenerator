import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ListUlAccordion(props) {

    let item = props.item;
    const { index, contentIndex } = props;

    // const [editAnswer, setEditAnswer] = useState('');
    // const [editAnswerCompareIndex, setEditAnswerCompareIndex] = useState('');
    // const [isEditAnswer, setIsEditAnswer] = useState(false);
    const [collapseId, setCollapseId] = useState(false);

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

    // const onDragEnd = result => {
    //     const { source, destination } = result;
        
    //     // dropped outside the list
    //     if (!destination) {
    //         return;
    //     }

    //     if (source.droppableId === destination.droppableId) {
    //         let reorderedFiles;

    //         if ((source.droppableId === 'files-droppable') && (destination.droppableId === 'files-droppable')) {
    //             reorderedFiles = reorder(
    //                 item.files,
    //                 source.index,
    //                 destination.index
    //             );

    //             let files = reorderedFiles;

    //             for (let key in files) {
    //                 files[key].weight = parseInt(key);
    //             }

    //             props.setQuestionFiles(files, index);
    //         } else if ((source.droppableId === 'answers-droppable') && (destination.droppableId === 'answers-droppable')) {
    //             reorderedFiles = reorder(
    //                 item.answers,
    //                 source.index,
    //                 destination.index
    //             );

    //             let answers = reorderedFiles;

    //             props.setQuestionAnswers(answers, index);
    //         }

            
    //     }
    // }

    return (
        <Accordion key={'accordion-multiple-choice-question-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <span>{item.entry}</span>
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
                        <span>Question: <strong>{item.entry}</strong></span>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default ListUlAccordion;
