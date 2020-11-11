import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheckCircle, faEdit, faTimes, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Card, Button } from 'react-bootstrap';

function MultipleChoiceAccordion(props) {

    const { item, index, contentIndex } = props;

    const [cNavCollapseId, setCNavCollapseId] = useState(false);
    const [updatedButtonName, setUpdatedButtonName] = useState('');
    const [isEditButtonName, setIsEditButtonName] = useState(false);
    const [isEditButtonNameCompareIndex, setIsEditButtonNameCompareIndex] = useState(-1);

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
        <Accordion className="w-100">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="p-2" onClick={() => collapseListener(cNavCollapseId, 'cNav')} style={{ cursor: 'pointer' }}>
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
                            <div id="edit-action-btn-grp" className="col-md-4 pr-0 text-right">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-1" 
                                    onClick={() => {
                                        setIsEditButtonName(false);
                                        props.updateButtonName(updatedButtonName, index);
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
                                    
                        <Accordion.Toggle as={Button} variant="default" className="p-0" eventKey="0" onClick={() => collapseListener(cNavCollapseId, 'cNav')}>
                            <div className="row m-0">
                                <div className="webupps-text-ellipsis col-md-7 p-0" title={item.name}>
                                    {item.name}
                                </div>
                                <div id="action-buttons-group" className="col-md-5 p-0 text-right">
                                    <span className="mr-2 ml-2">
                                        <FontAwesomeIcon icon={cNavCollapseId === true ? faCaretUp : faCaretDown}/>
                                    </span>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                        onClick={() => {
                                            setUpdatedButtonName(item.name);
                                            setIsEditButtonName(true);
                                            setIsEditButtonNameCompareIndex(index);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                        onClick={() => {
                                            props.deleteQuestion(index);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </button>
                                </div>
                            </div>
                        </Accordion.Toggle>
                    }
                </Accordion.Toggle>
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
                                                        props.setShowEditor(true, contentIndex, 'listModal', index);
                                                    }}
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
    );
}

export default MultipleChoiceAccordion;
