import React from 'react';

function CourseObjLayout(props) {

    const styles = props.styles;

    return (
        <div id="course-objective-layout">
            <div className="course-objective-container h-100 w-100 border border-light">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="course-header">yes</h2>
                    </div>
                    <div className="col-md-4">
                        <div className="course-intro-wrapper" style={{ background: styles.courseIntroColor}}>
                            <div className="mt-5">
                                <div type="button" className="mt-3">Course Navigation</div>
                                <div type="button" className="mt-3">Course Information</div>
                                <div type="button" className="mt-3">Course Requirements</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseObjLayout;
