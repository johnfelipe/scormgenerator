import React from 'react';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz

    return (
        <div id="quiz-multiple-layout">
            {
                quiz.length > 0 ?
                    quiz.map((item, itemIndex) => (
                        <div key={"quiz-question-" + itemIndex} className="question-group">
                            <h3><span>{(itemIndex+1) + '. ' + item.question}</span></h3>
                            <ul className="quiz-question-answers">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <span>{answer.answer}</span>
                                        </li>
                                    ))
                                }
                            </ul>
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
