import React from 'react';
import { objectHelpers } from '../../../helpers';
import ReactAudioPlayer from 'react-audio-player';
import { Player, ControlBar, ClosedCaptionButton } from 'video-react';

function DragDropLayout(props) {
    
    const dragDrop = props.dragDrop;
    const dragDropClass = props.dragDropClass;
    const alpbahet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const dragDropStyles = props.dragDropStyles;
    const dragDropCss = props.dragDropCss;
    // const multipleChoiceId = props.multipleChoiceId;

    const content = (item, dragDropClass) => {
        if (dragDropClass === 'question-files-left') {
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                        <ul className="drag-drop-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"drag-drop-question-answer" + answerIndex}>
                                        <div className="drag-drop mb-2 row m-0">
                                            <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                <span><strong>{alpbahet[answerIndex]}</strong></span>
                                            </div>
                                            <div className="drag-drop-choice-text">
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
        } else if (dragDropClass === 'question-files-right') {
            if ((objectHelpers.doesObjectInArrayExist(item.files, 'audio') === true) && (objectHelpers.doesObjectInArrayExist(item.files, 'img') === true)) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-8">
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                            <ul className="drag-drop-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"drag-drop-question-answer" + answerIndex}>
                                            <div className="drag-drop mb-2 row m-0">
                                                <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="drag-drop-choice-text">
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
                        <ul className="drag-drop-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"drag-drop-question-answer" + answerIndex}>
                                        <div className="drag-drop mb-2 row m-0">
                                            <div className={"drag-drop-label text-center " + dragDropStyles.questionLabelClass}>
                                                <span><strong>{alpbahet[answerIndex]}</strong></span>
                                            </div>
                                            <div className="drag-drop-choice-text">
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
        <div id="drag-drop-layout" className={"w-100 h-100 p-3 " + dragDropStyles.multipleChoiceTextColor} style={{ background: dragDropStyles.questionBackgroundColor, }}>
            {
                dragDrop.length > 0 ?
                    dragDrop.map((item, itemIndex) => (
                        <div key={"drag-drop-question-" + itemIndex} className={"question-group row mb-4 " + dragDropClass}>
                            <div className="col-md-12">
                                <p className="font-20"><span>{(itemIndex+1) + '. ' + item.question}</span></p>
                            </div>
                            {content(item, dragDropClass)}
                            {props.cssApplier(dragDropCss, 'drag-drop-layout')}
                            {
                                item.explanation.visibility === 'show' && item.explanation.content &&
                                <>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8 mt-3">
                                        <p id="question-explanation" className="p-3 rounded">
                                            {item.explanation.content}
                                        </p>
                                    </div>
                                    <div className="col-md-2"></div>
                                </>
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

export default DragDropLayout;
