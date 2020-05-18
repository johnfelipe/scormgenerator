import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ContentEditable from 'react-contenteditable';

const Columns = props => {
    return (
        <Accordion key={'accordion-column-' + props.columnIndex} className="mb-2">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="section-header p-2">
                    <ContentEditable
                        html={props.name}
                        onChange={(event) => this.handleContentEditable(event, props.columnIndex)}
                        className="content-editable d-inline"
                    />
                    <button type="button" className="float-right column-item-remove-btn btn btn-link p-0" title="Remove" onClick={() => props.deleteColumn(props.columnIndex)}><FontAwesomeIcon icon={faTrash}/></button>
                    <span className="float-right mr-3"><FontAwesomeIcon icon={faCaretDown}/></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="collapsible-body pb-3">
                    <Card.Body className="section-body">
                        <ul className="sg-column-layout">
                            {props.columnSizes.map((item, sizeIndex) => (
                                props.column[props.columnIndex].active === sizeIndex ?
                                    <li key={sizeIndex} className="sg-active">
                                        {props.columnSizes[sizeIndex].items.map((item, index) => (
                                            <span key={index} className={item.class}>
                                                {item.size}
                                            </span>
                                        ))}
                                    </li>
                                :
                                    <li key={sizeIndex} onClick={() => props.handleSizeActive(props.columnIndex, sizeIndex, item.id)}>
                                        {props.columnSizes[sizeIndex].items.map((item, index) =>(
                                            <span key={index} className={item.class}>
                                                {item.size}
                                            </span>
                                        ))}
                                    </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Columns;