import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function TabsAccordion(props) {

    let item = props.item;
    const { index, contentIndex } = props;

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
        <Accordion key={'accordion-tabs-' + index}>
            <Card>
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={index + 1}
                    className="p-2"
                    onClick={() => {
                        collapseListener(collapseId);
                        props.setActiveOutputIndex(index);
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div
                        id="tabs-list-item"
                        className="row m-0"
                    >
                        <div id="tabs-list-item-answer" className="webupps-text-ellipsis p-0 col-md-8" title={item.entry}>
                            {item.tabHeader}
                        </div>
                        <div className="col-md-4 p-0 tabs-list-item-action-buttons text-right">
                            <span className="mr-2">
                                <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                            </span>
                            <button
                                className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                type="button"
                                onClick={() => {
                                    props.setUpdateTabHeader(item.tabHeader);
                                    props.setIsEditTabHeader(true);
                                    props.setUpdateTabHeaderCompareIndex(index);
                                }}
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button
                                className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                type="button"
                                onClick={() => {
                                    props.deleteTabHeader(index);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index + 1}>
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
                                                        props.setShowEditor(true, contentIndex, 'tabsContent', index);
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

export default TabsAccordion;
