import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// styling
import '../css/styles.css';
import '../assets/bootstrap/css/bootstrap.min.css';

// data
import data from '../slide.json';

class Features extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [...data.feature.text, ...data.feature.video],
            selected: []
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount = () => {
        
        console.log(data.layout.region);

    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        features: 'items',
        regions: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    onDragEnd = result => {
        const { source, destination } = result;
        console.log(destination.regions);
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            let state = { items };

            if (source.droppableId === 'regions') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.features,
                selected: result.regions
            });
        }
    };

    render() {  
        return (
            <div className="drag-drop-container">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="features" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                className="features-container"
                                ref={provided.innerRef}>
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={'' + item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="feature-item"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {item.style ?
                                                    <>
                                                        {item.style}
                                                    </>
                                                    :
                                                    <>
                                                        {item.type}
                                                    </>
                                                }
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="regions">
                        {(provided, snapshot) => (
                            <div
                                className="region-container mt-3"
                                ref={provided.innerRef}>
                                {this.state.selected.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={'' + item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="region-item"
                                                region-id={data.layout.region[index].region}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {item.style ?
                                                    <>
                                                        {item.style}
                                                    </>
                                                    :
                                                    <>
                                                        {item.type}
                                                    </>
                                                }
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <button type="submit" className="btn btn-primary mt-2" >Save</button>
            </div>
        );
    }
}

export default Features;
