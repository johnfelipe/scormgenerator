import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function SgSubAccordion(props) {

    let item = props.item;
    // const { index, isAddSgAccordionContent, sgAccordionContent, contentIndex } = props;
    const { index, contentIndex } = props;

    // const [editSgAccordionContent, setEditSgAccordionContent] = useState('');
    // const [isEditSgAccordionContent, setIsEditSgAccordionContent] = useState(false);
    const [collapseId, setCollapseId] = useState(false);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    return (
        <Accordion key={'accordion-sg-accordion-' + index}>
            <Card>
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={index}
                    className="p-2"
                    onClick={() => {
                        collapseListener(collapseId);
                        console.log(index);
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <span>{item.title}</span>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.deleteSgAccordion(index);
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.setIsEditSgAccordion(true);
                            props.setUpdateSgAccordion(item.title);
                            props.setUpdateSgAccordionCompareIndex(index);
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
                                                        props.setShowEditor(true, contentIndex, 'accordion', index);
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

export default SgSubAccordion;
