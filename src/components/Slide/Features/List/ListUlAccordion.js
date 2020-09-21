import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ListUlAccordion(props) {

    let item = props.item;
    const { index, contentIndex, currentColumn, currentColumnContentIndex } = props;

    const [collapseId, setCollapseId] = useState(false);
    const [subEntry, setSubEntry] = useState('');
    const [isAddSubEntry, setIsAddSubEntry] = useState(false);
    const [editingSubentry, setEditingSubentry] = useState('');
    const [isEditSubEntry, setIsEditSubEntry] = useState(false);
    const [editSubEntryCompareIndex, setEditSubEntryCompareIndex] = useState(false);

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

    const setEntries = (subEntriesArray, entryIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.entries[entryIndex].subEntry = subEntriesArray;

        props.setColumn(currentColumnObj);
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let reorderedArray;

            if ((source.droppableId === 'sub-entry-droppable') && (destination.droppableId === 'sub-entry-droppable')) {
                reorderedArray = reorder(
                    item.subEntry,
                    source.index,
                    destination.index
                );

                let subEntries = reorderedArray;

                setEntries(subEntries, index);
            }

            
        }
    }

    const addSubEntry = (value, entryIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.entries[entryIndex].subEntry.push(value);

        props.setColumn(currentColumnObj);
    }

    const editSubEntry = (value, entryIndex, subEntryIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.entries[entryIndex].subEntry[subEntryIndex] = value;

        props.setColumn(currentColumnObj);
    }

    const deleteSubEntry = (entryIndex, subEntryIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.entries[entryIndex].subEntry.splice(subEntryIndex, 1);

        props.setColumn(currentColumnObj);
    }

    return (
        <Accordion key={'accordion-list-ul-entry-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index + 1} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <div
                        id="list-ul-list-item"
                        className="row m-0"
                    >
                        <div id="list-ul-list-item-answer" className="webupps-text-ellipsis p-0 col-md-8" title={item.entry}>
                            {item.entry}
                        </div>
                        <div className="col-md-4 p-0 list-ul-list-item-action-buttons text-right">
                            <span className="mr-2">
                                <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                            </span>
                            <button
                                className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                type="button"
                                onClick={() => {
                                    props.setUpdateEntry(item.entry);
                                    props.setIsEditEntry(true);
                                    props.setUpdateEntryCompareIndex(index);
                                }}
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button
                                className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                type="button"
                                onClick={() => {
                                    props.deleteEntry(index);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body className="p-2">
                        <span>Entry: <strong>{item.entry}</strong></span>
                        {
                            isAddSubEntry ?
                                <div className="list-ul-control-input-wrapper mb-1 mt-3 mb-3">
                                    <div className="list-ul-control-input-label">
                                        <span>Add:&nbsp;</span>
                                    </div>
                                    <div className="list-ul-control-input">
                                        <input
                                            id="subEntry"
                                            name="subEntry"
                                            type="text"
                                            placeholder="Type sub entry here. . ."
                                            onChange={(event) => setSubEntry(event.target.value)}
                                            value={subEntry}
                                        />
                                    </div>
                                    <div className="list-ul-control-button">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm mr-1"
                                            onClick={() => {
                                                const isEmpty = document.getElementById("subEntry");
                                                
                                                if (isEmpty.value !== "") {
                                                    addSubEntry(subEntry, index);
                                                    setSubEntry('');
                                                    setIsAddSubEntry(false);
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSubEntry('');
                                                setIsAddSubEntry(false);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </button>
                                    </div>
                                </div>
                            :
                                <div className="list-ul-action-button m-0 mt-2 mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => {
                                            setIsAddSubEntry(true);
                                        }}
                                    >
                                        Add sub entry
                                    </button>
                                </div>
                        }
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="sub-entry-droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {item.subEntry.length > 0 ?
                                            <ul className="list-ul-list list-unstyled">
                                                {item.subEntry.map((subEntry, subEntryIndex) => (
                                                    <Draggable
                                                        key={'list-ul-answers-list-item-key-' + subEntryIndex}
                                                        draggableId={'list-ul-answers-list-item-' + subEntryIndex}
                                                        index={subEntryIndex}
                                                    >
                                                        {(provided) => (
                                                            <li
                                                                className="list-ul-list-item mb-3"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                {
                                                                    isEditSubEntry && editSubEntryCompareIndex === subEntryIndex ?
                                                                        <div className="list-ul-control-input-wrapper mb-1 mt-3 mb-3">
                                                                            <div className="list-ul-control-input-label">
                                                                                <span>Edit:&nbsp;</span>
                                                                            </div>
                                                                            <div className="list-ul-control-input">
                                                                                <input
                                                                                    id="question"
                                                                                    name="question"
                                                                                    type="text"
                                                                                    placeholder="Type question here. . ."
                                                                                    onChange={(event) => setEditingSubentry(event.target.value)}
                                                                                    value={editingSubentry}
                                                                                />
                                                                            </div>
                                                                            <div className="list-ul-control-button">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-success btn-sm mr-1"
                                                                                    onClick={() => {
                                                                                        const isEmpty = document.getElementById("question");
                                                                                        
                                                                                        if (isEmpty.value !== "") {
                                                                                            editSubEntry(editingSubentry, index, subEntryIndex);
                                                                                            setEditingSubentry('');
                                                                                            setIsEditSubEntry(false);
                                                                                            setEditSubEntryCompareIndex('');
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
                                                                                id="list-ul-list-item-sub-entry"
                                                                                className="row mb-0 border rounded-top"
                                                                            >
                                                                                <div id="list-ul-list-item-sub-entry" className="p-0 col-md-8" title={subEntry}>
                                                                                    {subEntry}
                                                                                </div>
                                                                                <div className="col-md-4 p-0 list-ul-list-item-action-buttons text-right">
                                                                                    <button
                                                                                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setEditingSubentry(subEntry);
                                                                                            setIsEditSubEntry(true);
                                                                                            setEditSubEntryCompareIndex(subEntryIndex);
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faEdit}/>
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            deleteSubEntry(index, subEntryIndex);
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTrash}/>
                                                                                    </button>
                                                                                </div>
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

export default ListUlAccordion;
