import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// styling
import '../css/styles.css';
import '../assets/bootstrap/css/bootstrap.min.css';

// data
import data from '../slide.json';

class Generator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feature_items: [...data.feature.text, ...data.feature.video],
            region_items: []
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onSave = this.onSave.bind(this);
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
        features: 'feature_items',
        regions: 'region_items'
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

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const feature_items = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            let state = { feature_items };

            if (source.droppableId === 'regions') {
                state = { region_items: feature_items };
            }

            this.setState(state);
        } else {
            if (source.droppableId === "features" && this.state.region_items.length !== 3) {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    feature_items: result.features,
                    region_items: result.regions
                });
            } else if (source.droppableId === "regions") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    feature_items: result.features,
                    region_items: result.regions
                });
            }
        }
    };

    onSave = () => {
        let regionDiv = document.getElementsByClassName('region-container')[0].childNodes;
        regionDiv.forEach(element => {

            let i;

            for (i = 0; i < element.attributes.length; i++) {
                if (element.attributes[i].name === 'feature-type' || element.attributes[i].name === 'feature-text-style' || element.attributes[i].name === 'feature-video-type' || element.attributes[i].name === 'region-id') {
                    console.log(element.attributes[i].name + ': ' + element.attributes[i].value);
                }
            }
            
        });
        console.log('Clicked!');
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
                                {this.state.feature_items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={'' + item.id}
                                        index={index}>
                                        {(provided) => (
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
                                {this.state.region_items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={'' + item.id}
                                        index={index}>
                                        {(provided) => (
                                            <div
                                                className="region-item"
                                                
                                                feature-type={item.style ? "feature.text" : item.type ? "feature.video" : ""}
                                                feature-text-style={item.style}
                                                feature-video-type={item.type}
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

                <button onClick={this.onSave} type="submit" className="btn btn-primary mt-2" >Save</button>
            </div>
        );
    }
}

export default Generator;
