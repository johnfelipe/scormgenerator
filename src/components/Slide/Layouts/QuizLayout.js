import React from 'react';
import { objectHelpers } from '../../../helpers';
import ReactAudioPlayer from 'react-audio-player';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz;

    const content = (item) => {
        if ((objectHelpers.isEmpty(item, 'audio') === true) && (objectHelpers.isEmpty(item, 'img') === true)) {
            return (
                <>
                    <div class="col-md-5">
                        <img src={item.img.url} className="w-100 h-auto" alt="Relation to the question"/>
                        <ReactAudioPlayer
                            src={item.audio.url}
                            controls
                            title={item.audio.name}
                            className="mt-3 w-100"
                            id="audio-question-player"
                        />
                    </div>
                    <div className="col-md-7">
                        <ul className="quiz-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"quiz-question-answer" + answerIndex}>
                                        <div class="custom-control custom-checkbox mb-2">
                                            <input type="checkbox" class="custom-control-input" id={"answer-" + answerIndex} name={answer.answer} disabled={true}/>
                                            <label class="custom-control-label font-20" htmlFor={"answer-" + answerIndex}>{answer.answer}</label>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>
            );
        } else if (objectHelpers.isEmpty(item, 'img')) {
            return (
                <>
                    <div class="col-md-4">
                        <img src={item.img.url} className="w-100 h-auto" alt="Relation to the question"/>
                    </div>
                    <div className="col-md-8">
                        <ul className="quiz-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"quiz-question-answer" + answerIndex}>
                                        <div class="custom-control custom-checkbox mb-2">
                                            <input type="checkbox" class="custom-control-input" id={"answer-" + answerIndex} name={answer.answer} disabled={true}/>
                                            <label class="custom-control-label font-20" htmlFor={"answer-" + answerIndex}>{answer.answer}</label>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>
            );
        } else if (objectHelpers.isEmpty(item, 'audio')) {
            return (
                <>
                    <div className="col-md-12">
                        <ul className="quiz-question-answers list-unstyled pl-5">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"quiz-question-answer" + answerIndex}>
                                        <div class="custom-control custom-checkbox mb-2">
                                            <input type="checkbox" class="custom-control-input" id={"answer-" + answerIndex} name={answer.answer} disabled={true}/>
                                            <label class="custom-control-label font-20" htmlFor={"answer-" + answerIndex}>{answer.answer}</label>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-md-12">
                        <ReactAudioPlayer
                            src={item.audio.url}
                            controls
                            title={item.audio.name}
                            id="audio-question-player"
                        />
                    </div>
                </>
            );
        } else {
            return (
                <div className="col-md-12 ml-2">
                    <ul className="quiz-question-answers list-unstyled pl-5">
                        {
                            item.answers.map((answer, answerIndex) => (
                                <li key={"quiz-question-answer" + answerIndex}>
                                    <div class="custom-control custom-checkbox mb-2">
                                        <input type="checkbox" class="custom-control-input" id={"answer-" + answerIndex} name={answer.answer} disabled={true}/>
                                        <label class="custom-control-label font-20" for={"answer-" + answerIndex}>{answer.answer}</label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            );
        }
    }
    
    return (
        <div id="quiz-multiple-layout" className="w-100 h-100 p-3">
            {
                quiz.length > 0 ?
                    quiz.map((item, itemIndex) => (
                        <div key={"quiz-question-" + itemIndex} className="question-group row">
                            <div className="col-md-12">
                                <p className="font-20"><span>{(itemIndex+1) + '. ' + item.question}</span></p>
                            </div>
                            {
                                
                                    content(item)
                            }
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
