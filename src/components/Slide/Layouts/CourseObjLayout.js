import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Player, ControlBar } from 'video-react';
import { Modal } from 'react-bootstrap';
import imageSrc from '../../../styles/img/wbt_nav_sscs.png';

function CourseObjLayout(props) {

    const [courseNavModalShow, setCourseNavModalShow] = useState(false);
    const [courseInfoModalShow, setCourseInfoModalShow] = useState(false);
    const [courseReqModalShow, setCourseReqModalShow] = useState(false);
    const styles = props.styles;
    const introVideo = props.content.introVideo;
    const courseInfoContent = props.content.courseInfo;

    const courseNavModal = (
        <Modal
            show={courseNavModalShow}
            onHide={() => setCourseNavModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Course Navigation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={imageSrc} alt="Select Menu button for course options, Previous and Next buttons to navigate, Resources button for source materials, and glossary button for definitions, acronyms and abbreviations." className="w-100 h-100"/>
            </Modal.Body>
            {/* <Modal.Footer>
                <button className="btn btn-primary" onClick={() => setCourseNavModalShow(false)}>Close</button>
            </Modal.Footer> */}
        </Modal>
    );
    const courseInfoModal = (
        <Modal
            show={courseInfoModalShow}
            onHide={() => setCourseInfoModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Course Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{courseInfoContent}</p>
            </Modal.Body>
            {/* <Modal.Footer>
                <button className="btn btn-primary" onClick={() => setCourseInfoModalShow(false)}>Close</button>
            </Modal.Footer> */}
        </Modal>
    );

    const courseReqModal = (
        <Modal
            show={courseReqModalShow}
            onHide={() => setCourseReqModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Course Requirements
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{courseInfoContent}</p>
            </Modal.Body>
            {/* <Modal.Footer>
                <button className="btn btn-primary" onClick={() => setCourseReqModalShow(false)}>Close</button>
            </Modal.Footer> */}
        </Modal>
    );

    return (
        <div id="course-objective-layout">
            <div className="course-objective-container h-100 w-100 border border-light">
                <div className="row">
                    <div className="col-md-8">
                        <Player className="course-obj-itro-video h-100 w-100">
                            <source src={introVideo} />
                            
                            <ControlBar autoHide={true}/>
                        </Player>
                        {/* <video className="course-obj-itro-video h-100 w-100" controls>
                            <source src={introVideo}/>
                            Your browser does not support the video tag.
                        </video> */}
                    </div>
                    <div className="col-md-4">
                        <div className="course-intro-wrapper w-100 h-100 p-4" style={{ background: styles.courseIntroColor}}>
                            <div className="mt-3">
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseNavModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;Course Navigation
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseInfoModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;Course Information
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseReqModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;Course Requirements
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {courseNavModal}
            {courseInfoModal}
            {courseReqModal}
        </div>
    );
}

export default CourseObjLayout;
