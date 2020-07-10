import React from 'react';

function HomePageLayout(props) {

    const title = props.title;
    const subtitle = props.subtitle;
    const date = props.date;
    const courseId = props.courseId;

    return (
        <div className="container title">
            <div className="slide">
                <div className="course-name">
                    <h2 className="course-header">{title}</h2>
                <div className="course-bar"></div>
                <h3 className="course-sub-header">{subtitle}<br/>{date}<br/>COURSE ID: {courseId}</h3>
                </div>
            </div>
        </div>
    );
}

export default HomePageLayout;
