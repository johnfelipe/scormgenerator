import React from 'react';

function DragDropLayout(props) {
    
    const dragDrop = props.dragDrop;
    const dragDropClass = props.dragDropClass;
    const dragDropStyles = props.dragDropStyles;
    const dragDropCss = props.dragDropCss;

    const content = (item) => {
        return (
            <div className="col-md-12 pl-3 row m-0">
                <div className="col-md-6 text-center">
                    <ul class="options text-break">
                        <li class="title">Options</li>
                        {item.options.map((option, optionIndex) => (
                            <li key={'drag-drop-option-' + optionIndex}>{option.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <ol className="drag-drop-question-answers">
                        {item.questions.map((question, questionIndex) => (
                            <li key={"drag-drop-question-answer" + questionIndex}>
                                <div className="drag-drop mb-2 m-0 row">
                                    <div className="drag-drop-choice-text font-15">
                                        <span class="target" data-accept={question.answer}>&nbsp;</span>
                                        <span>,&nbsp;{question.question}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
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
                            <p className="font-20"><span>{(itemIndex+1) + '. ' + item.instruction}</span></p>
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
