import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
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
    const slideName = props.slideName;
    const slideSubtitle = props.slideSubtitle;
    const showTitle = props.showTitle;

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
                    {courseNavTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CourseNavContent 
                    backgroundColor={styles.courseIntroColor}
                />
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
                <>
                    <div className={showTitle ? "row" : "row d-none"}>
                        <div className="col-12">
                            {styles.titleBoxBorder === 'border-left' ?
                                <div
                                    className={"slide-header text-left " + styles.titleBoxBorder}
                                    ref={(el) => {
                                        if (el) {
                                            el.style.setProperty('border-left-color', styles.titleBoxColor, 'important');
                                            el.style.setProperty('color', styles.titleTextColor, 'important');
                                        }
                                    }}
                                >
                                    <h3 className="slide-subtitle">{slideName}</h3>
                                    <h2 className="slide-title">{slideSubtitle}</h2>
                                </div>
                            :
                                <div className="slide-header text-left">
                                    <h3 className="slide-subtitle">{slideName}</h3>
                                    <h2 className="slide-title">
                                        <span
                                            className={styles.titleBoxBorder}
                                            ref={(el) => {
                                                if (el) {
                                                    el.style.setProperty('border-top-color', styles.titleBoxColor, 'important');
                                                }
                                            }}
                                        >
                                            {slideSubtitle}
                                        </span>
                                    </h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            {/* <Player className="course-obj-intro-video h-100 w-100">
                                <source src={introVideo.url} />
                                
                                <ControlBar autoHide={true}/>
                            </Player> */}
                            <video className="course-obj-intro-video h-100 w-100" controls src={introVideo.url}>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="col-md-4">
                            <div className="course-intro-wrapper w-100 h-100 p-4" style={{ background: styles.courseIntroColor}}>
                                <div className="mt-3">
                                    {/* <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseNavModalShow(true)}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseNavTitle}
                                    </button> */}
                                    <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" data-toggle="modal" data-target="#courseNav" onClick={() => setCourseNavModalShow(true)}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;{courseNavTitle}
                                    </button>
                                    {/* <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseInfoModalShow(true)}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseInfoTitle}
                                    </button> */}
                                    <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" data-toggle="modal" data-target="#courseInfo"  onClick={() => setCourseInfoModalShow(true)}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;{courseInfoTitle}
                                    </button>
                                    {/* <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseReqModalShow(true)}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseReqTitle}
                                    </button> */}
                                    <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" data-toggle="modal" data-target="#courseReq" onClick={() => setCourseReqModalShow(true)}>
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;{courseReqTitle}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else if (courseObjectiveClass === 'course-objectives-video-right') {
            return (
                <>
                    <div className={showTitle ? "row" : "row d-none"}>
                        <div className="col-12">
                            {styles.titleBoxBorder === 'border-left' ?
                                <div
                                    className={"slide-header text-left " + styles.titleBoxBorder}
                                    ref={(el) => {
                                        if (el) {
                                            el.style.setProperty('border-left-color', styles.titleBoxColor, 'important');
                                            el.style.setProperty('color', styles.titleTextColor, 'important');
                                        }
                                    }}
                                >
                                    <h3 className="slide-subtitle">{slideName}</h3>
                                    <h2 className="slide-title">{slideSubtitle}</h2>
                                </div>
                            :
                                <div className="slide-header text-left">
                                    <h3 className="slide-subtitle">{slideName}</h3>
                                    <h2 className="slide-title">
                                        <span
                                            className={styles.titleBoxBorder}
                                            ref={(el) => {
                                                if (el) {
                                                    el.style.setProperty('border-top-color', styles.titleBoxColor, 'important');
                                                }
                                            }}
                                        >
                                            {slideSubtitle}
                                        </span>
                                    </h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="course-intro-wrapper w-100 h-100 p-4" style={{ background: styles.courseIntroColor}}>
                                <div className="mt-3">
                                    {/* <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseNavModalShow(true)}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseNavTitle}
                                    </button> */}
                                    <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" data-toggle="modal" data-target="#courseNav">
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;{courseNavTitle}
                                    </button>
                                    {/* <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseInfoModalShow(true)}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseInfoTitle}
                                    </button> */}
                                    <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" data-toggle="modal" data-target="#courseInfo">
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;{courseInfoTitle}
                                    </button>
                                    {/* <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" onClick={() => setCourseReqModalShow(true)}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;{courseReqTitle}
                                    </button> */}
                                    <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14" data-toggle="modal" data-target="#courseReq">
                                        <i className="fas fa-info-circle"></i>
                                        &nbsp;{courseReqTitle}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {/* <Player className="course-obj-intro-video h-100 w-100">
                                <source src={introVideo.url} />
                                
                                <ControlBar autoHide={true}/>
                            </Player> */}
                            <video className="course-obj-intro-video h-100 w-100" controls src={introVideo.url}>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </>
            );
        }
    }

    return (
        <div className="course-objective-layout">
            <div className="course-objective-container h-100 w-100 p-4 bg-white">
                {content(introVideo.position)}
            </div>
            {courseNavModal}
            {courseInfoModal}
            {courseReqModal}
            
            {/* Modals */}
            {/* Course Nav */}
            <div role="dialog" aria-hidden="true" className="fade modal" tabIndex="-1" aria-labelledby="courseNavLabel" id="courseNav">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{courseNavTitle}</div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <CourseNavContent 
                                backgroundColor={styles.courseIntroColor}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Course info */}
            <div role="dialog" aria-hidden="true" className="fade modal" tabIndex="-1" aria-labelledby="courseInfoLabel" id="courseInfo">
                <div role="document" className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{courseInfoTitle}</div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {ReactHtmlParser(courseInfoContent)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course req */}
            <div role="dialog" aria-hidden="true" className="fade modal" tabIndex="-1" aria-labelledby="courseReqLabel" id="courseReq">
                <div role="document" className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{courseReqTitle}</div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {ReactHtmlParser(courseReqContent)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseObjLayout;
