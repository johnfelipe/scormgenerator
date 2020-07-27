import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import ContentEditable from 'react-contenteditable';

// components
import ChangeGridWarning from '../AlertModal/ChangeGridWarning';

function Columns (props) {

    const [modalShow, setModalShow] = useState(false);
    const currentColumn = props.currentColumn;
    const [collapseId, setCollapseId] = useState(false);
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const columnIndex = props.columnIndex;
    const [sizeIndex, setSizeIndex] = useState(-1);
    const [itemId, setItemId] = useState(-1);
    const [removeFeatures, setRemoveFeaures] = useState(false);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }
    
    useEffect(() => {
        if (removeFeatures) {
            props.handleSizeActive(columnIndex, sizeIndex, itemId);
            setRemoveFeaures(false);
            props.resetStates();
        }
    }, [removeFeatures, props, columnIndex, sizeIndex, itemId]);

    return (
        <Accordion key={'accordion-column-' + columnIndex} className="mb-2">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="section-header p-2" onClick={collapseListener}>
                    <ContentEditable
                        html={props.name}
                        onChange={(event) => props.handleContentEditable(event, columnIndex)}
                        className="content-editable d-inline"
                    />
                    <button type="button" className="float-right column-item-remove-btn btn btn-link p-0" title="Remove" onClick={() => props.deleteColumn(columnIndex)}>
                        <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                    </button>
                    <span className="float-right mr-3"><FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="collapsible-body pb-3">
                    <Card.Body className="section-body">
                        <ul className="sg-column-layout">
                            {props.columnSizes.map((item, sizeIndex) => (
                                props.column[columnIndex].active === sizeIndex ?
                                    <li key={sizeIndex} className="sg-active">
                                        {props.columnSizes[sizeIndex].items.map((item, index) => (
                                            <span key={index} className={item.class}>
                                                {item.size}
                                            </span>
                                        ))}
                                    </li>
                                :
                                    <li
                                        key={sizeIndex}
                                        onClick={() => {
                                            if (currentColumn.content[currentColumnContentIndex].length > 0) {
                                                setModalShow(true);
                                                setSizeIndex(sizeIndex);
                                                setItemId(item.id);
                                            } else {
                                                props.handleSizeActive(columnIndex, sizeIndex, item.id);
                                            }
                                        }}
                                    >
                                        {props.columnSizes[sizeIndex].items.map((item, index) => (
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

            <ChangeGridWarning
                setRemoveFeaures={setRemoveFeaures}
                modalShow={modalShow}
                setModalShow={setModalShow}
                handleSizeActive={props.handleSizeActive}
                columnIndex={columnIndex}
                sizeIndex={sizeIndex}
                itemId={itemId}
            />
        </Accordion>
    );
}

export default Columns;
