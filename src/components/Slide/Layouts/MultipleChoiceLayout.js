import React from 'react';
import { objectHelpers } from '../../../helpers';
import ReactAudioPlayer from 'react-audio-player';
import { Player, ControlBar, ClosedCaptionButton } from 'video-react';

function MultipleChoiceLayout(props) {
    
    const multipleChoice = props.multipleChoice;
    const multipleChoiceClass = props.multipleChoiceClass;
    const alpbahet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const multipleChoiceStyles = props.multipleChoiceStyles;
    const multipleChoiceCss = props.multipleChoiceCss;
    // const multipleChoiceId = props.multipleChoiceId;

    const content = (item, multipleChoiceClass) => {
        if (multipleChoiceClass === 'question-files-left') {
            if ((objectHelpers.doesObjectInArrayExist(item.files, 'audio') === true) && (objectHelpers.doesObjectInArrayExist(item.files, 'img') === true)) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');
                
                return (
                    <>
                        <div className="col-md-4">
                            {
                                item.files[imgIndex].weight === 0 || item.files[audioIndex].weight === 1 ?
                                    <>
                                        <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                                        {item.files[imgIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[imgIndex].label}</span>
                                            </div>
                                        }
                                        <ReactAudioPlayer
                                            src={item.files[audioIndex].audio.url}
                                            controls
                                            title={item.files[audioIndex].audio.name}
                                            className="mt-3 w-100"
                                            id="audio-question-player"
                                        />
                                        {item.files[audioIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[audioIndex].label}</span>
                                            </div>
                                        }
                                    </>
                                :
                                    <>
                                        <ReactAudioPlayer
                                            src={item.files[audioIndex].audio.url}
                                            controls
                                            title={item.files[audioIndex].audio.name}
                                            className="mt-3 w-100"
                                            id="audio-question-player"
                                        />
                                        {item.files[audioIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[audioIndex].label}</span>
                                            </div>
                                        }
                                        <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                                        {item.files[imgIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[imgIndex].label}</span>
                                            </div>
                                        }
                                    </>
                            }
                        </div>
                        <div className="col-md-8">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'img')) {
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-4">
                            <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                            {item.files[imgIndex].label &&
                                <div className="mt-2 text-center">
                                    <span className="font-15">{item.files[imgIndex].label}</span>
                                </div>
                            }
                        </div>
                        <div className="col-md-8">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'audio')) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');

                return (
                    <>
                        <div className="col-md-12">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <ReactAudioPlayer
                                src={item.files[audioIndex].audio.url}
                                controls
                                title={item.files[audioIndex].audio.name}
                                id="audio-question-player"
                            />
                            {item.files[audioIndex].label &&
                                <div className="mt-2 text-center">
                                    <span className="font-15">{item.files[audioIndex].label}</span>
                                </div>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'video')) {
                const videoIndex = objectHelpers.findObjectIndexInArray(item.files, 'video');

                return (
                    <>
                        <div className="col-md-6">
                            <Player>
                                <source src={item.files[videoIndex].video.url} />
                                <track
                                    kind="captions"
                                    src={item.files[videoIndex].video.caption && item.files[videoIndex].video.caption.url}
                                    srcLang="en"
                                    label="English"
                                    default
                                />
                                <ControlBar autoHide={true}>
                                    <ClosedCaptionButton order={7} />
                                </ControlBar>
                            </Player>
                            {item.files[videoIndex].label &&
                                <div className="mt-2 text-center">
                                    <span className="font-15">{item.files[videoIndex].label}</span>
                                </div>
                            }
                        </div>
                        <div className="col-md-6">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
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
                        <ul className="multiple-choice-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"multiple-choicequestion-answer" + answerIndex}>
                                        <div className="multiple-choice mb-2 row m-0">
                                            <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                <span><strong>{alpbahet[answerIndex]}</strong></span>
                                            </div>
                                            <div className="multiple-choice-choice-text">
                                                <span>{answer.answer}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                );
            }
        } else if (multipleChoiceClass === 'question-files-right') {
            if ((objectHelpers.doesObjectInArrayExist(item.files, 'audio') === true) && (objectHelpers.doesObjectInArrayExist(item.files, 'img') === true)) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-8">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">
                            {
                                item.files[imgIndex].weight === 0 || item.files[audioIndex].weight === 1 ?
                                    <>
                                        <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                                        {item.files[imgIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[imgIndex].label}</span>
                                            </div>
                                        }
                                        <ReactAudioPlayer
                                            src={item.files[audioIndex].audio.url}
                                            controls
                                            title={item.files[audioIndex].audio.name}
                                            className="mt-3 w-100"
                                            id="audio-question-player"
                                        />
                                        {item.files[audioIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[audioIndex].label}</span>
                                            </div>
                                        }
                                    </>
                                :
                                    <>
                                        <ReactAudioPlayer
                                            src={item.files[audioIndex].audio.url}
                                            controls
                                            title={item.files[audioIndex].audio.name}
                                            className="mt-3 w-100"
                                            id="audio-question-player"
                                        />
                                        {item.files[audioIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[audioIndex].label}</span>
                                            </div>
                                        }
                                        <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                                        {item.files[imgIndex].label &&
                                            <div className="mt-2 text-center">
                                                <span className="font-15">{item.files[imgIndex].label}</span>
                                            </div>
                                        }
                                    </>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'img')) {
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-8">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                            {item.files[imgIndex].label &&
                                <div className="mt-2 text-center">
                                    <span className="font-15">{item.files[imgIndex].label}</span>
                                </div>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'audio')) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');

                return (
                    <>
                        <div className="col-md-12">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <ReactAudioPlayer
                                src={item.files[audioIndex].audio.url}
                                controls
                                title={item.files[audioIndex].audio.name}
                                id="audio-question-player"
                            />
                            {item.files[audioIndex].label &&
                                <div className="mt-2 text-center">
                                    <span className="font-15">{item.files[audioIndex].label}</span>
                                </div>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'video')) {
                const videoIndex = objectHelpers.findObjectIndexInArray(item.files, 'video');

                return (
                    <>
                        <div className="col-md-6">
                            <ul className="multiple-choice-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"multiple-choicequestion-answer" + answerIndex}>
                                            <div className="multiple-choice mb-2 row m-0">
                                                <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="multiple-choice-choice-text">
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
                                <source src={item.files[videoIndex].video.url} />
                                <track
                                    kind="captions"
                                    src={item.files[videoIndex].video.caption && item.files[videoIndex].video.caption.url}
                                    srcLang="en"
                                    label="English"
                                    default
                                />
                                <ControlBar autoHide={true}>
                                    <ClosedCaptionButton order={7} />
                                </ControlBar>
                            </Player>
                            {item.files[videoIndex].label &&
                                <div className="mt-2 text-center">
                                    <span className="font-15">{item.files[videoIndex].label}</span>
                                </div>
                            }
                        </div>
                    </>
                );
            } else {
                return (
                    <div className="col-md-12 ml-2">
                        <ul className="multiple-choice-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"multiple-choicequestion-answer" + answerIndex}>
                                        <div className="multiple-choice mb-2 row m-0">
                                            <div className={"multiple-choice-label text-center " + multipleChoiceStyles.questionLabelClass}>
                                                <span><strong>{alpbahet[answerIndex]}</strong></span>
                                            </div>
                                            <div className="multiple-choice-choice-text">
                                                <span>{answer.answer}</span>
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
        <div id="multiple-choice-layout" className={"w-100 h-100 p-3 " + multipleChoiceStyles.multipleChoiceTextColor} style={{ background: multipleChoiceStyles.questionBackgroundColor, }}>
            {
                multipleChoice.length > 0 ?
                    multipleChoice.map((item, itemIndex) => (
                        <div key={"multiple-choicequestion-" + itemIndex} className={"question-group row mb-4 " + multipleChoiceClass}>
                            <div className="col-md-12">
                                <p className="font-20"><span>{(itemIndex+1) + '. ' + item.question}</span></p>
                            </div>
                            {content(item, multipleChoiceClass)}
                            {props.cssApplier(multipleChoiceCss, 'multiple-choice-layout')}
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

export default MultipleChoiceLayout;
