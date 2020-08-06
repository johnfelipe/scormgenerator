import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faCheckCircle, faEdit, faTimes, faCaretUp, faCaretDown, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Card, Button } from 'react-bootstrap';

function List(props) {

    const { contentIndex, currentColumn, currentColumnContentIndex,  } = props;

    const [addedButtonName, setAddedButtonName] = useState('')
    const [updatedButtonName, setUpdatedButtonName] = useState('');
    const [cNavCollapseId, setCNavCollapseId] = useState(false);
    const [isEditButtonName, setIsEditButtonName] = useState(false);
    const [isEditButtonNameCompareIndex, setIsEditButtonNameCompareIndex] = useState(-1);

    const addButtonObj = (value) => {
        const currentColumnObj = currentColumn;

        const buttonObj = {
            name: value,
            type: 'button',
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(buttonObj);

        props.setColumn(currentColumnObj);
    }

    const updateButtonName = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseNav.name = value;

        props.setColumn(currentColumnObj);
    }

    const collapseListener = (currentCollapseId, type) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

       if (type === 'cNav') {
            setCNavCollapseId(currentCollapseId);
        }
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
                                <ul style={{ listStyle: 'none' }} className="list-group multiple-choice-question-list">
                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 &&
                                        <>
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                <li key={'number-' + index} className="multiple-choice-question-list-item mb-2">
                                                    <Accordion className="w-100">
                                                        <Card>
                                                            <Card.Header>
                                                                {isEditButtonName && isEditButtonNameCompareIndex === index ?
                                                                    <div className="row m-0">
                                                                        <div className="col-md-8 p-0">
                                                                            <input
                                                                                name="courseInfoName"
                                                                                className="form-control"
                                                                                value={updatedButtonName}
                                                                                onChange={(e) => setUpdatedButtonName(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div id="edit-action-btn-grp" className="col-md-4 pr-0">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm mt-1" 
                                                                                onClick={() => {
                                                                                    setIsEditButtonName(false);
                                                                                    updateButtonName(updatedButtonName);
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faCheckCircle}/>
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-danger btn-sm ml-2 mt-1"
                                                                                onClick={() => {
                                                                                    setIsEditButtonName(false);
                                                                                    setUpdatedButtonName('')
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faTimes}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    <div className="row m-0">
                                                                        <div className="col-md-9 pl-0">
                                                                            <Accordion.Toggle as={Button} variant="link" className="p-0" eventKey="0" onClick={() => collapseListener(cNavCollapseId, 'cNav')}>
                                                                                {item.name}
                                                                            </Accordion.Toggle>
                                                                        </div>
                                                                        <div id="action-buttons-group" className="col-md-3 p-0">
                                                                            <span className="float-right mr-2">
                                                                                <FontAwesomeIcon icon={cNavCollapseId === true ? faCaretUp : faCaretDown}/>
                                                                            </span>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => {
                                                                                    setUpdatedButtonName(item.name);
                                                                                    setIsEditButtonName(true);
                                                                                    setIsEditButtonNameCompareIndex(index);
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faEdit}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey="0">
                                                                <Card.Body>
                                                                    <ul className="sg-control-input-list">
                                                                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                                            <div className="sg-control-input-list-label">
                                                                                <span>Content</span>
                                                                            </div>
                                                                            <div className="sg-control-input-list-input">
                                                                                <div className="sg-expandable-code-editor">
                                                                                    <div className="sg-workspace-expander">
                                                                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                                                onClick={() => {
                                                                                                    props.setShowEditor(true, contentIndex, 'courseNav');
                                                                                                }}
                                                                                                disabled
                                                                                            >
                                                                                                <span>Edit</span>
                                                                                            </button>
                                                                                            <input type="text" value="" disabled className="rounded"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                    </Accordion>
                                                </li>
                                            ))}
                                            <li className="multiple-choice-question-list-item">
                                                <div className="multiple-choice-control-input-wrapper">
                                                    <div className="multiple-choice-control-input-label">
                                                        <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                    </div>
                                                    <div className="multiple-choice-control-input">
                                                        <input
                                                            id="buttonName"
                                                            name="buttonName"
                                                            type="text"
                                                            placeholder="Type name here. . ."
                                                            onChange={(event) => setAddedButtonName(event.target.value)}
                                                            value={addedButtonName}
                                                        />
                                                    </div>
                                                    <div className="multiple-choice-control-button">
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
                                            </li>
                                        </>
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default List;
