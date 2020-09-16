import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import ContentEditable from 'react-contenteditable';

// redux
import { useDispatch } from 'react-redux';

// actions
import { columnActions, courseActions } from '../../actions';

// components
import ChangeGridWarning from '../AlertModal/ChangeGridWarning';

function Columns (props) {

    const dispatch = useDispatch();
    const { currentColumnContentIndex, columnIndex, clid, slideIndex, lessonIndex, courseLayout, dragHandleProps } = props;
    const [modalShow, setModalShow] = useState(false);
    const currentColumn = props.currentColumn;
    const [collapseId, setCollapseId] = useState(false);
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
                <Accordion.Toggle as={Card.Header} eventKey="0" className="section-header p-2" onClick={() => collapseListener(collapseId)}>
                    <ContentEditable
                        html={props.name}
                        onChange={(event) => props.handleContentEditable(event, columnIndex)}
                        className="content-editable d-inline"
                    />
                    {courseLayout === "fluid" &&
                        <>
                            <button
                                type="button"
                                className="float-right column-item-remove-btn btn btn-link p-0"
                                title="Remove"
                                onClick={() => {
                                    props.deleteColumn(columnIndex);
                                    dispatch(courseActions.deleteSlideColumnFromCourseLesson(columnIndex, slideIndex, lessonIndex));
                                    
                                    if (clid) {
                                        dispatch(columnActions.deleteColumn(clid));
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                            </button>
                            <span className="float-right mr-3" {...dragHandleProps}><FontAwesomeIcon icon={faArrowsAlt}/></span>
                        </>
                    }
                    <span className="float-right mr-3"><FontAwesomeIcon icon={collapseId ? faCaretUp : faCaretDown}/></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="collapsible-body pb-3">
                    <Card.Body className="section-body">
                        <ul className={courseLayout === "fixed" ? "sg-column-layout disabled" : "sg-column-layout"}>
                            {props.columnSizes.map((item, sizeIndex) => (
                                props.column[columnIndex].active === sizeIndex ?
                                    <li key={sizeIndex} className={"sg-active grid-size-item-" + sizeIndex}>
                                        {props.columnSizes[sizeIndex].items.map((item, index) => (
                                            <span key={index} className={item.class}>
                                                {item.size}
                                            </span>
                                        ))}
                                    </li>
                                :
                                    courseLayout === "fixed" ?
                                        <li
                                            key={sizeIndex}
                                            className={"disabled grid-size-item-" + sizeIndex}
                                        >
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
                                            className={"grid-size-item-" + sizeIndex}
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
