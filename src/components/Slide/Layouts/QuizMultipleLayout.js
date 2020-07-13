import React from 'react';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz

    return (
        <div id="quiz-multiple-layout">
            {
                quiz.length > 0 ?
                    quiz.map((item, itemIndex) => (
                        <div key={itemIndex} className="question-group">
                            <h3><span>{(itemIndex+1) + '. ' + item.question}</span></h3>
                        </div>
                    ))
                :
                    <div>
                        <span>No questions added.</span>
                    </div>
            }
        </div>
    );
}

export default QuizMultipleLayout;
