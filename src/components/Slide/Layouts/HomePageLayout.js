import React from 'react';

function HomePageLayout(props) {

    const title = props.title;
    const subtitle = props.subtitle;
    const date = props.date;
    const courseId = props.courseId;
    const backgroundImg = props.backgroundImg.url;
    const homePageClass = props.homePageClass;

    return (
        <div id="home-page-layout">
            <div className="home-page-container h-100 w-100 border border-light" style={{ backgroundImage: 'url("' + backgroundImg + '")', backgroundSize: 'cover' }}>
                <div className="slide">
                    <div id="course-name" className={homePageClass}>
                        <h2 className="course-header">{title}</h2>
                    <div className="course-bar"></div>
                    <h3 className="course-sub-header">
                        <span>{subtitle}</span>
                        <br/>
                        <span>{date}</span>
                        <br/>
                        <span>COURSE ID: {courseId}</span>
                    </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageLayout;
