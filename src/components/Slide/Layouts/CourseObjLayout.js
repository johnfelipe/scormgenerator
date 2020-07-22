import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function CourseObjLayout(props) {

    const styles = props.styles;

    return (
        <div id="course-objective-layout">
            <div className="course-objective-container h-100 w-100 border border-light">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="course-header">Sample</h2>
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
