import React from 'react';
import { objectHelpers } from '../../../helpers';
import ReactAudioPlayer from 'react-audio-player';
import { Player, ControlBar, ClosedCaptionButton } from 'video-react';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz;
    const quizClass = props.quizClass;
    const alpbahet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const content = (item, quizClass) => {
        if (quizClass === 'question-files-left') {
            if ((objectHelpers.isEmpty(item, 'audio') === true) && (objectHelpers.isEmpty(item, 'img') === true)) {
                return (
                    <>
                        <div className="col-md-4">
                            <img src={item.img.url} className="w-100 h-auto" alt="Relation to the question"/>
                            <ReactAudioPlayer
                                src={item.audio.url}
                                controls
                                title={item.audio.name}
                                className="mt-3 w-100"
                                id="audio-question-player"
                            />
                        </div>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-20 ml-2">{answer.answer}</span>
                                                </div>
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
                        <div className="col-md-4">
                            <img src={item.img.url} className="w-100 h-auto" alt="Relation to the question"/>
                        </div>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-20 ml-2">{answer.answer}</span>
                                                </div>
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
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-20 ml-2">{answer.answer}</span>
                                                </div>
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
            } else if (objectHelpers.isEmpty(item, 'video')) {
                return (
                    <>
                        <div className="col-md-6">
                            <Player>
                                <source src={item.video.url} />
                                <track
                                    kind="captions"
                                    src={item.video.caption && item.video.caption}
                                    srcLang="en"
                                    label="English"
                                    default
                                />
                                <ControlBar autoHide={true}>
                                    <ClosedCaptionButton order={7} />
                                </ControlBar>
                            </Player>
                        </div>
                        <div className="col-md-6">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-15"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-15 ml-2">{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
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
                                        <div className="mb-2 row">
                                            <div className="col-md-1 p-0 text-center">
                                                <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                            </div>
                                            <div className="col-md-11 p-0">
                                                <span className="font-20 ml-2">{answer.answer}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                );
            }
        } else if (quizClass === 'question-files-right') {
            if ((objectHelpers.isEmpty(item, 'audio') === true) && (objectHelpers.isEmpty(item, 'img') === true)) {
                return (
                    <>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-20 ml-2">{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <img src={item.img.url} className="w-100 h-auto" alt="Relation to the question"/>
                            <ReactAudioPlayer
                                src={item.audio.url}
                                controls
                                title={item.audio.name}
                                className="mt-3 w-100"
                                id="audio-question-player"
                            />
                        </div>
                    </>
                );
            } else if (objectHelpers.isEmpty(item, 'img')) {
                return (
                    <>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-20 ml-2">{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <img src={item.img.url} className="w-100 h-auto" alt="Relation to the question"/>
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
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-20 ml-2">{answer.answer}</span>
                                                </div>
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
            } else if (objectHelpers.isEmpty(item, 'video')) {
                return (
                    <>
                        <div className="col-md-6">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="mb-2 row">
                                                <div className="col-md-1 p-0 text-center">
                                                    <span className="font-15"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                                </div>
                                                <div className="col-md-11 p-0">
                                                    <span className="font-15 ml-2">{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <Player>
                                <source src={item.video.url} />
                                <ControlBar autoHide={true} />
                            </Player>
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
                                        <div className="mb-2 row">
                                            <div className="col-md-1 p-0 text-center">
                                                <span className="font-20"><strong>{alpbahet[answerIndex] + '. '}</strong></span>
                                            </div>
                                            <div className="col-md-11 p-0">
                                                <span className="font-20 ml-2">{answer.answer}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                );
            }
        }
    }
    
    return (
        <div id="quiz-multiple-layout" className="w-100 h-100 p-3">
            {
                quiz.length > 0 ?
                    quiz.map((item, itemIndex) => (
                        <div key={"quiz-question-" + itemIndex} className={"question-group row " + quizClass}>
                            <div className="col-md-12">
                                <p className="font-20"><span>{(itemIndex+1) + '. ' + item.question}</span></p>
                            </div>
                            {content(item, quizClass)}
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
