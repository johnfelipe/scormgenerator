import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// components
import ListModalAccordion from './ListModalAccordion';

function ListModal(props) {

    const { contentIndex, currentColumn, currentColumnContentIndex,  } = props;
    const listButtonModal = currentColumn.content[currentColumnContentIndex][contentIndex].output;
    const [addedButtonName, setAddedButtonName] = useState('');

    const addButtonObj = (value) => {
        const currentColumnObj = currentColumn;

        const buttonObj = {
            name: value,
            type: 'button',
            content: ''
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(buttonObj);

        props.setColumn(currentColumnObj);
    }

    const updateButtonName = (value, buttonIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[buttonIndex].name = value;

        props.setColumn(currentColumnObj);
    }

    const deleteQuestion = (buttonIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(buttonIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }

    const setListButtonModal = (listButtonModalArray) => {
        const currentColumnObj = currentColumn;

        currentColumn.content[currentColumnContentIndex][contentIndex].output = listButtonModalArray;

        props.setColumn(currentColumnObj);
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let reorderedFiles;

            if ((source.droppableId === 'list-modal-droppable') && (destination.droppableId === 'list-modal-droppable')) {
                reorderedFiles = reorder(
                    listButtonModal,
                    source.index,
                    destination.index
                );

                setListButtonModal(reorderedFiles);
            }
        }
    }

    const setBtnWidth = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.btnWidth = value;

        props.setColumn(currentColumnObj);
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'list')}>
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
                                <span>Button/s</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="list-modal-droppable">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                <ul style={{ listStyle: 'none' }} className="list-group list-modal-button-list">
                                                    {listButtonModal.length > 0 &&
                                                        <>
                                                            {listButtonModal.map((item, index) => (
                                                                <Draggable
                                                                    key={'list-modal-button-answers-list-item-key-' + index}
                                                                    draggableId={'list-modal-button-answers-list-item-' + index}
                                                                    index={index}
                                                                >
                                                                    {(provided) => (
                                                                        <li
                                                                            className="list-modal-button-list-item mb-2"
                                                                            key={'number-' + index}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <ListModalAccordion
                                                                                item={item}
                                                                                index={index}
                                                                                updateButtonName={updateButtonName}
                                                                                deleteQuestion={deleteQuestion}
                                                                                contentIndex={contentIndex}
                                                                            />
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                        </>
                                                    }
                                                </ul>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <div className="list-modal-button-list-item">
                                    <div className="list-modal-control-input-wrapper">
                                        <div className="list-modal-control-input-label">
                                            <span>{listButtonModal.length+1}.</span>
                                        </div>
                                        <div className="list-modal-control-input">
                                            <input
                                                id="buttonName"
                                                name="buttonName"
                                                type="text"
                                                placeholder="Type name here. . ."
                                                onChange={(event) => setAddedButtonName(event.target.value)}
                                                value={addedButtonName}
                                            />
                                        </div>
                                        <div className="list-modal-control-button">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm"
                                                onClick={() => {
                                                    const isEmpty = document.getElementById("buttonName");
                                                    
                                                    if (isEmpty.value !== "") {
                                                        addButtonObj(addedButtonName);
                                                        setAddedButtonName('');
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                                        // typeof currentColumn != "undefined" &&
                                        // 'content' in currentColumn &&
                                        // currentColumn.content.length > 0 &&
                                        // currentColumn.content[contentIndex].id
                                        currentColumn.content[contentIndex] && currentColumn.content[contentIndex].id
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
                                        // typeof currentColumn != "undefined" &&
                                        // 'content' in currentColumn &&
                                        // currentColumn.content.length > 0 &&
                                        // currentColumn.content[contentIndex].class
                                        currentColumn.content[contentIndex] && currentColumn.content[contentIndex].class
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Set button width in percentage.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Button Width</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="number"
                                    name="btnWidth"
                                    min="0"
                                    onChange={(event) => {
                                        if (parseInt(event.target.value) >= 0 && parseInt(event.target.value)) {
                                            setBtnWidth(parseInt(event.target.value))
                                        }
                                    }}
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].styles.btnWidth &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].styles.btnWidth
                                    }
                                />
                            </div>
                            <div className="sg-control-input-list-label-suffix">
                                <span>&nbsp;%</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ListModal;
