import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="p-2" onClick={() => collapseListener(collapseId)}>
                    <div className="row m-0">
                        <div className="col-md-9">
                            <span>First Card</span>
                        </div>
                        <div className="col-md-3 webupps-vertical-center justify-content-between pl-0">
                            <span>
                                <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                            </span>
                            <OverlayTrigger
                                key="first-card-top"
                                placement="top"
                                overlay={
                                    <Tooltip id='first-card-tooltip-top'>
                                        <span>Reset</span>
                                    </Tooltip>
                                }
                            >
                                <button type="button" className="btn btn-primary btn-sm ml-2" onClick={() => {resetCard(1)}}>
                                    <FontAwesomeIcon icon={faUndo}/>
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="p-2">
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
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default ContentWithPictureAccordion;
