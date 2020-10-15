import React, { useState } from 'react';
import { Accordion, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faWindowClose, faCaretUp, faCaretDown, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { courseActions, lessonActions, slideActions } from '../../actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LessonHandler from '../Handlers/LessonHandler';

function CourseEditorAccordion(props) {

    const { lessonIndex, lesson, currentCourse, dragHandleProps, courseLessons, currentClickedLessonId, cid, lessonId } = props;
    const [collapseId, setCollapseId] = useState(false);
    const dispatch = useDispatch();

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEndSlides = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        
        if ((source.droppableId === "slides") && (destination.droppableId === "slides") && (source.droppableId === destination.droppableId)) {
            const lessonSlideList = courseLessons[currentClickedLessonId].slides;

            const reordered_slides = reorder(
                lessonSlideList,
                source.index,
                destination.index
            );
            let slides = reordered_slides;

            for (let i = 0; i < slides.length; i++) {
                const data = {
                    weight: i
                }
                slides[i].weight = i;
                dispatch(slideActions.updateSlide(data, slides[i].sid, cid, 'rearrange'));
            }

            const lessons = [...courseLessons];
            lessons[currentClickedLessonId].slides = slides;
        }
    }

    return (
        <Accordion key={lessonIndex}>
            <Card>
                <Card.Header className="row m-0">
                    <div className="col-md-10 pl-0">
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey="0"
                            className="pr-0"
                            onClick={() => {
                                props.setCurrentClickedLessonId(lessonIndex);
                                props.setLid(lesson.lid);
                                collapseListener(collapseId);
                            }}
                        >
                            <span>{lesson.title}</span>
                        </Accordion.Toggle>
                        <LessonHandler
                            action="edit"
                            currentLessonName={lesson.title}
                            id={lessonIndex}
                            cid={lesson.cid}
                            uid={lesson.uid}
                            lid={lesson.lid}
                        />
                    </div>
                    <div className="col-md-2 webupps-vertical-center justify-content-end">
                        <OverlayTrigger
                            key="draggable-top"
                            placement="top"
                            overlay={
                                <Tooltip id='draggable-tooltip-top'>
                                    <span>Drag Handle</span>
                                </Tooltip>
                            }
                        >
                            <span
                                {...dragHandleProps}
                            >
                                <FontAwesomeIcon icon={faArrowsAlt}/>
                            </span>
                        </OverlayTrigger>
                        <span className="float-right ml-3">
                            <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                        </span>
                        <OverlayTrigger
                            key="duplicate-top"
                            placement="top"
                            overlay={
                                <Tooltip id='duplicate-tooltip-top'>
                                    <span>Duplicate lesson</span>
                                </Tooltip>
                            }
                        >
                            <button
                                type="button"
                                className="btn btn-sm btn-primary ml-3"
                                onClick={() => {
                                    dispatch(lessonActions.duplicateLesson(lesson.lid));
                                }}
                            >
                                <FontAwesomeIcon icon={faCopy}/>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            key="delete-top"
                            placement="top"
                            overlay={
                                <Tooltip id='delete-tooltip-top'>
                                    <span>Delete lesson</span>
                                </Tooltip>
                            }
                        >
                            <button
                                className="btn btn-danger btn-sm ml-3"
                                title="Remove"
                                onClick={() => {
                                    dispatch(lessonActions.deleteLesson(lesson.lid));
                                }}
                            >
                                <FontAwesomeIcon icon={faWindowClose} />
                            </button>
                        </OverlayTrigger>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <div id="slide-handler-add-btn" className="d-inline">
                            <Link
                                to={"/course/" + currentCourse.cid + "/lesson/" + lesson.lid + "/add-slide"}
                                className="btn btn-success"
                                onClick={() => props.redirectToAddSlidePage(currentCourse, lessonIndex, lesson, lessonId)}
                            >Add Slide</Link>
                        </div>
                        {lesson.slides && lesson.slides.length > 0 ?
                            <DragDropContext onDragEnd={onDragEndSlides}>
                                <Droppable droppableId="slides">
                                    {(provided) => (
                                        <div
                                            className="slide-container mt-3"
                                            ref={provided.innerRef}
                                        >
                                            {lesson.slides.map((slide, slideIndex) => (
                                                <Draggable
                                                    key={'lessonSlide-' + slideIndex}
                                                    draggableId={'lessonSlide-' + slideIndex}
                                                    index={slideIndex}>
                                                    {(provided) => (
                                                        <div
                                                            id={"slide-item-" + slideIndex}
                                                            className={slideIndex !== 0 ? "slide-item row m-0 mt-2" : "slide-item row m-0"}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <div className="col-md-10 pl-0">
                                                                <span className="btn pr-1">{slide.title}</span>
                                                                <div id="slide-handler-add-btn" className="d-inline">
                                                                    <div id="edit-slide-btn" className="d-inline">
                                                                        <Link
                                                                            to={"/course/" + currentCourse.cid + "/lesson/" + lesson.lid + "/edit-slide/" + slide.sid}
                                                                            className="btn btn-link  pl-0"
                                                                            onClick={() => props.redirectToEditSlidePage(currentCourse, slide, lessonIndex, lesson, slideIndex)}
                                                                        >| Edit</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 webupps-vertical-center justify-content-end">
                                                                <OverlayTrigger
                                                                    key="draggable-slide-top"
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id='draggable-slide-tooltip-top'>
                                                                            <span>Drag Handle</span>
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <span
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <FontAwesomeIcon icon={faArrowsAlt}/>
                                                                    </span>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger
                                                                    key="duplicate-slide-top"
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id='duplicate-slide-tooltip-top'>
                                                                            <span>Duplicate slide</span>
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-primary ml-3"
                                                                        onClick={() => {
                                                                            dispatch(courseActions.duplicateSlide(lessonIndex, lesson.lid, slide.sid));
                                                                            console.log(lessonIndex)
                                                                            console.log(lesson.lid)
                                                                            console.log(slide.sid)
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={faCopy}/>
                                                                    </button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger
                                                                    key="delete-slide-top"
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id='delete-slide-tooltip-top'>
                                                                            <span>Delete slide</span>
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button 
                                                                        className="btn btn-danger btn-sm ml-3" 
                                                                        title="Remove" 
                                                                        onClick={() => {
                                                                            // this.props.deleteSlide(slideIndex, currentClickedLessonId)
                                                                            dispatch(slideActions.deleteSlide(slide.sid));
                                                                            dispatch(courseActions.deleteSlideFromCourseLesson(slideIndex, currentClickedLessonId));
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={faWindowClose} />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        :
                            <div className="mt-2">No slide added yet.</div>
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default CourseEditorAccordion;
