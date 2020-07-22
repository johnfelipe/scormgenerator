import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Player, ControlBar } from 'video-react';

function CourseObjLayout(props) {

    const styles = props.styles;
    const introVideo = props.content.introVideo;

    return (
        <div id="course-objective-layout">
            <div className="course-objective-container h-100 w-100 border border-light">
                <div className="row">
                    <div className="col-md-8">
                        {/* <Player className="course-obj-itro-video h-100 w-100">
                            <source src={introVideo} />
                            
                            <ControlBar autoHide={true}/>
                        </Player> */}
                        <video className="course-obj-itro-video h-100 w-100" controls>
                            <source src={introVideo}/>
                            {/* <source src="movie.ogg" type="video/ogg"/> */}
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="col-md-4">
                        <div className="course-intro-wrapper w-100 h-100 p-4" style={{ background: styles.courseIntroColor}}>
                            <div className="mt-3">
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14">
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;Course Navigation
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14">
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;Course Information
                                </button>
                                <button type="button" className="btn btn-light rounded-0 mt-3 w-100 font-14">
                                    <FontAwesomeIcon icon={faInfoCircle}/>&nbsp;Course Requirements
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseObjLayout;
