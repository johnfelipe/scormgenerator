import React from 'react';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz

    return (
        <div id="quiz-multiple-layout">
            <div className="home-page-container h-100 w-100" style={{ backgroundImage: 'url("' + backgroundImg + '")', backgroundSize: 'cover' }}>
                <div className="slide">
                    <div className="course-name">
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

export default QuizMultipleLayout;
