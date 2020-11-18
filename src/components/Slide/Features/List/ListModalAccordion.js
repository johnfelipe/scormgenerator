import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheckCircle, faEdit, faCaretUp, faCaretDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Card } from 'react-bootstrap';

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
        <>
            {isEditButtonName && isEditButtonNameCompareIndex === index ?
                <div className="list-modal-button-list-item">
                    <div className="list-modal-control-input-wrapper">
                        <div className="list-modal-control-input-label">
                            <span>{index+1}.</span>
                        </div>
                        <div className="list-modal-control-input">
                            <input
                                id="buttonName"
                                name="buttonName"
                                type="text"
                                value={updatedButtonName}
                                onChange={(e) => setUpdatedButtonName(e.target.value)}
                            />
                        </div>
                        <div className="list-modal-control-button">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm" 
                                onClick={() => {
                                    setIsEditButtonName(false);
                                    props.updateButtonName(updatedButtonName, index);
                                }}
                            >
                                <FontAwesomeIcon icon={faCheckCircle}/>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm ml-2"
                                onClick={() => {
                                    setIsEditButtonName(false);
                                    setUpdatedButtonName('')
                                }}
                            >
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </button>
                        </div>
                    </div>
                </div>
            :
                <Accordion className="w-100">
                    <Card>       
                        <Accordion.Toggle as={Card.Header} className="p-2" eventKey="0">
                            <div className="row m-0">
                                <div className="webupps-text-ellipsis col-md-7 p-0" title={item.name} onClick={() => collapseListener(cNavCollapseId, 'cNav')}>
                                    {item.name}
                                </div>
                                <div id="action-buttons-group" className="col-md-5 p-0 text-right">
                                    <span className="mr-2 ml-2" onClick={() => collapseListener(cNavCollapseId, 'cNav')}>
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
            }
        </>
    );
}

export default MultipleChoiceAccordion;
