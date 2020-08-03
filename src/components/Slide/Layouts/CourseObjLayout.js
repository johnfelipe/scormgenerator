import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import imageSrc from '../../../styles/img/wbt_nav_sscs.png';
import ReactHtmlParser from 'react-html-parser';

// components
import CourseNavContent from '../Features/CourseObjectives/CourseNav.js';

function CourseObjLayout(props) {

    const [courseNavModalShow, setCourseNavModalShow] = useState(false);
    const [courseInfoModalShow, setCourseInfoModalShow] = useState(false);
    const [courseReqModalShow, setCourseReqModalShow] = useState(false);
    const styles = props.styles;
    const introVideo = props.introVideo;
    const courseNavTitle = props.output.courseNav.name;
    const courseInfoTitle = props.output.courseInfo.name;
    const courseReqTitle = props.output.courseReq.name;
    const courseInfoContent = props.output.courseInfo.content;
    const courseReqContent = props.output.courseReq.content;

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
                <CourseNavContent />
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
                    {courseInfoTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ReactHtmlParser(courseInfoContent)}
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
                    {courseReqTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ReactHtmlParser(courseReqContent)}
            </Modal.Body>
            {/* <Modal.Footer>
                <button className="btn btn-primary" onClick={() => setCourseReqModalShow(false)}>Close</button>
            </Modal.Footer> */}
        </Modal>
    );

    const content = (courseObjectiveClass) => {
        if (courseObjectiveClass === 'course-objectives-video-left') {
            return (
                <div className="row">
                    <div className="col-md-8">
                        {/* <Player className="course-obj-itro-video h-100 w-100">
                            <source src={introVideo.url} />
                            
                            <ControlBar autoHide={true}/>
                        </Player> */}
                        <video className="course-obj-itro-video h-100 w-100" controls src={introVideo.url}>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="col-md-4">
                        <div className="course-intro-wrapper w-100 h-100 p-4" style={{ background: styles.courseIntroColor}}>
                            <div className="mt-3">
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseNavModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseNavTitle}
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseInfoModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseInfoTitle}
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseReqModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseReqTitle}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (courseObjectiveClass === 'course-objectives-video-right') {
            return (
                <div className="row">
                    <div className="col-md-4">
                        <div className="course-intro-wrapper w-100 h-100 p-4" style={{ background: styles.courseIntroColor}}>
                            <div className="mt-3">
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseNavModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseNavTitle}
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseInfoModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseInfoTitle}
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseReqModalShow(true)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseReqTitle}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {/* <Player className="course-obj-itro-video h-100 w-100">
                            <source src={introVideo.url} />
                            
                            <ControlBar autoHide={true}/>
                        </Player> */}
                        <video className="course-obj-itro-video h-100 w-100" controls src={introVideo.url}>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            );
        }
    }

    return (
        <div id="course-objective-layout">
            <div className="course-objective-container h-100 w-100 border border-light">
                {content(introVideo.position)}
            </div>
            {courseNavModal}
            {courseInfoModal}
            {courseReqModal}
        </div>
    );
}

export default CourseObjLayout;
