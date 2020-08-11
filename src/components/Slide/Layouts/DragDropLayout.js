import React from 'react';

function DragDropLayout(props) {
    
    const dragDrop = props.dragDrop;
    const dragDropClass = props.dragDropClass;
    const alpbahet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const dragDropStyles = props.dragDropStyles;
    const dragDropCss = props.dragDropCss;

    const content = (item) => {
        return (
            <div className="col-md-12 pl-3 row m-0">
                <div className="col-md-8">
                    <ul className="drag-drop-question-answers list-unstyled">
                        {item.answers.map((answer, answerIndex) => (
                            <li key={"drag-drop-question-answer" + answerIndex}>
                                <div className="drag-drop mb-2 m-0 row">
                                    <div className={"drag-drop-label text-center " + dragDropStyles.dragDropLabelClass}>
                                        <span><strong>{alpbahet[answerIndex]}</strong></span>
                                    </div>
                                    <div className="drag-drop-choice-text">
                                        <span>{answer.answer}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4 border border-dark">
                    <span className="drag-drop-answer-here">Drag Answer here</span>
                </div>
            </div>
        );
    }
    
    return (
        <div id="drag-drop-layout" className={"w-100 h-100 p-3 " + dragDropStyles.dragDropTextColor} style={{ background: dragDropStyles.dragDropBackgroundColor, }}>
            {dragDrop.length > 0 ?
                dragDrop.map((item, itemIndex) => (
                    <div key={"drag-drop-question-" + itemIndex} className={"question-group row mb-4 " + dragDropClass}>
                        <div className="col-md-12">
                            <p className="font-20"><span>{(itemIndex+1) + '. ' + item.question}</span></p>
                        </div>
                        {content(item)}
                        {props.cssApplier(dragDropCss, 'drag-drop-layout')}
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
