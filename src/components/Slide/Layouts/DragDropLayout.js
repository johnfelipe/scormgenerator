import React from 'react';
import { arrayHelpers } from '../../../helpers';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragDropLayout(props) {
    
    const dragDrop = props.dragDrop;
    const dragDropClass = props.dragDropClass;
    const dragDropStyles = props.dragDropStyles;
    const dragDropCss = props.dragDropCss;

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        console.log(source);
        console.log(destination);

        // if (source.droppableId === destination.droppableId) {
        //     let reorderedArray;

        //     if ((source.droppableId === 'questions-droppable') && (destination.droppableId === 'questions-droppable')) {
        //         reorderedArray = reorder(
        //             item.questions,
        //             source.index,
        //             destination.index
        //         );

        //         let questions = reorderedArray;

        //         props.setQuestionAnswers(questions, index);
        //     }
        // }
    }

    const content = (item) => {

        const options = arrayHelpers.shuffle(item.options);

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="col-md-12 p-0 row m-0">
                    <Droppable droppableId="options-droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="col-md-4 p-0"
                            >
                                <ul
                                    className="options text-break w-100"
                                    ref={(el) => {
                                        if (el) {
                                            el.style.setProperty('border-color', dragDropStyles.themeColor, 'important');
                                        }
                                    }}
                                >
                                    <li className="title" style={{ background: dragDropStyles.themeColor }}>Options</li>
                                    {options.map((option, optionIndex) => (
                                        <Draggable
                                            key={'drag-drop-question-answers-list-item-key-' + optionIndex}
                                            draggableId={'drag-drop-question-answers-list-item-' + optionIndex}
                                            index={optionIndex}
                                        >
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    
                                                    key={'drag-drop-option-' + optionIndex}
                                                    className="option"
                                                    data-target={option.name}
                                                >
                                                    {option.name}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                </ul>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className="col-md-8 p-0">
                        <ol className="drag-drop-question-answers">
                            {item.questions.map((question, questionIndex) => (
                                <li key={"drag-drop-question-answer" + questionIndex}>
                                    <div className="drag-drop mb-2 m-0 row">
                                        <div className="drag-drop-choice-text font-15">
                                            <Droppable droppableId="answer-droppable">
                                                {(provided) => (
                                                    <span
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}

                                                        className="target"
                                                        data-accept={question.answer}
                                                    >
                                                        &nbsp;
                                                        {provided.placeholder}
                                                    </span>
                                                )}
                                            </Droppable>
                                            <span>,&nbsp;{question.question}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </DragDropContext>
        );
    }
    
    return (
        <div id="drag-drop-layout" className={"w-100 h-100 border border-light " + dragDropStyles.dragDropTextColor} style={{ background: dragDropStyles.dragDropBackgroundColor, }}>
            {dragDrop.length > 0 ?
                dragDrop.map((item, itemIndex) => (
                    <div key={"drag-drop-question-" + itemIndex} className={"question-group row m-0 mb-4 " + dragDropClass}>
                        <div className="col-md-12 mb-3 p-4 text-white" style={{ background: dragDropStyles.themeColor }}>
                            <p className="font-20 m-0"><span>{(itemIndex+1) + '. ' + item.instruction}</span></p>
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
