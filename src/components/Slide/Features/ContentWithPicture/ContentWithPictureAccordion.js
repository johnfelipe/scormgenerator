import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function ContentWithPictureAccordion(props) {

    const { contentIndex, currentColumnContentIndex, currentColumn, modalIndex, modalItem } = props;
    const [collapseId, setCollapseId] = useState(false);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    const deleteModal = (index) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.modal.splice(index, 1);

        props.setColumn(currentColumnObj);
    }

    return (
        <Accordion key={'accordion-content-picture-' + modalIndex} className="w-100 mt-2">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="p-2" onClick={() => collapseListener(collapseId)}>
                    <div className="row m-0">
                        <div className="col-md-7 pr-0 webupps-vertical-center">
                            <span>{modalItem.title}</span>
                        </div>
                        <div className="col-md-5 pl-0 webupps-vertical-center justify-content-end">
                            <span>
                                <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                            </span>
                            <OverlayTrigger
                                key="edit-btn-top"
                                placement="top"
                                overlay={
                                    <Tooltip id='edit-btn-tooltip-top'>
                                        <span>Edit title of modal</span>
                                    </Tooltip>
                                }
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm ml-2"
                                    onClick={() => {
                                        props.setModalTitle(true);
                                        props.setUpdateTitle(modalItem.title);
                                        props.setUpdateModalCompareIndex(modalIndex);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                key="delete-btn-top"
                                placement="top"
                                overlay={
                                    <Tooltip id='delete-btn-tooltip-top'>
                                        <span>Delete modal</span>
                                    </Tooltip>
                                }
                            >
                                <button type="button" className="btn btn-danger btn-sm ml-2" onClick={() => {deleteModal(modalIndex)}}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="p-2">
                        <div className="sg-control-input">
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
                                                            props.setShowEditor(true, contentIndex, 'contenPictureModal', modalIndex);
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
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default ContentWithPictureAccordion;
