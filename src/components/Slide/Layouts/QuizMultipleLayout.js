import React from 'react';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz

    return (
        <div id="quiz-multiple-layout" className="w-100 h-100 p-3">
            {
                quiz.length > 0 ?
                    quiz.map((item, itemIndex) => (
                        <div key={"quiz-question-" + itemIndex} className="question-group">
                            <h3><span>{(itemIndex+1) + '. ' + item.question}</span></h3>
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" class="custom-control-input" id={"answer-" + answerIndex} name={answer.answer} disabled={true}/>
                                                <label class="custom-control-label" for={"answer-" + answerIndex}>{answer.answer}</label>
                                            </div>
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
