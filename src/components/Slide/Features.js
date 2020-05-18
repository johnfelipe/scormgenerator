import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio } from '@fortawesome/free-regular-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Features extends Component {

    constructor(props) {
        super(props);
        this.state = {
            features: [
                { name: 'Audio', icon: faFileAudio, },
                { name: 'Content Area', icon: faSquare, },
            ]
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="features">
                    {(provided) => (
                        <div ref={provided.innerRef} className="sg-element-library">
                            {this.state.features.map((item, featureIndex) => (
                                <Draggable
                                    key={'draggable-' + featureIndex}
                                    draggableId={'' + featureIndex}
                                    index={featureIndex}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="sg-element-library-item"
                                        >
                                            <FontAwesomeIcon className="feature-icon" icon={item.icon}/>
                                            <h4>{item.name}</h4>
                                            <FontAwesomeIcon icon={faArrowsAlt}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default Features;
