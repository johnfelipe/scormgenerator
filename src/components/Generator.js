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
            first_region_items: [],
            second_region_items: [],
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        features: 'feature_items',
        firstRegion: 'first_region_items',
        secondRegion: 'second_region_items',
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

            if (source.droppableId === 'firstRegion') {
                state = { first_region_items: feature_items };
            }

            if (source.droppableId === 'secondRegion') {
                state = { second_region_items: feature_items };
            }

            this.setState(state);
        } else {
            if (source.droppableId === "features" && this.state.first_region_items.length !== data.layout.region.length && destination.droppableId === "firstRegion") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
                console.log('Region 1');
                this.setState({
                    feature_items: result.features,
                    first_region_items: result.firstRegion,
                });
            } else if (source.droppableId === "features" && this.state.second_region_items.length !== data.layout.region.length && destination.droppableId === "secondRegion") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
                console.log('Region 2');
                this.setState({
                    feature_items: result.features,
                    second_region_items: result.secondRegion,
                });
            } else if (source.droppableId === "firstRegion" && destination.droppableId === "features") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    feature_items: result.features,
                    first_region_items: result.firstRegion,
                });
            } else if (source.droppableId === "secondRegion" && destination.droppableId === "features") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    feature_items: result.features,
                    second_region_items: result.secondRegion,
                });
            } else if (source.droppableId === "firstRegion" && destination.droppableId === "secondRegion") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    first_region_items: result.firstRegion,
                    second_region_items: result.secondRegion,
                });
            } else if (source.droppableId === "secondRegion" && destination.droppableId === "firstRegion") {
                const result = this.move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    first_region_items: result.firstRegion,
                    second_region_items: result.secondRegion,
                });
            }
        }
    };

    onSave = () => {
        let jsonData = {
            slide: {
                content: []
            }
        }
        console.log(document.getElementsByClassName('region-container'));
        let regionDiv = document.getElementsByClassName('region-container');
        for (let child of regionDiv) {
            console.log(child.childNodes);

            let items = child.childNodes;
            items.forEach(function (element, counter) {
                counter++;

                let i, feature, featureTextStyle, featureVideoType, region;

                for (i = 0; i < element.attributes.length; i++) {
                    if (element.attributes[i].name === 'feature-type') {
                        feature = element.attributes[i].value;
                    } else if (element.attributes[i].name === 'feature-text-style') {
                        featureTextStyle = element.attributes[i].value;
                    } else if (element.attributes[i].name === 'feature-video-type') {
                        featureVideoType = element.attributes[i].value;
                    } else if (element.attributes[i].name === 'region-id') {
                        region = element.attributes[i].value;
                    }
                }

                if (featureTextStyle) {
                    let obj = { "id":counter,"feature": feature, "feature.text.style": featureTextStyle, "region": region }
                    jsonData.slide.content.push(obj);
                } else if (featureVideoType) {
                    let obj = { "id":counter,"feature": feature, "feature.video.type": featureVideoType, "region": region }
                    jsonData.slide.content.push(obj);
                }
                
            });
        }

        let filename = "course.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(jsonData)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(jsonData));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        
        console.log(jsonData);
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
                    <Droppable droppableId="firstRegion">
                        {(provided, snapshot) => (
                            <div
                                className="region-container mt-3"
                                ref={provided.innerRef}>
                                {this.state.first_region_items.map((item, index) => (
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
                    <Droppable droppableId="secondRegion">
                        {(provided, snapshot) => (
                            <div
                                className="region-container mt-3"
                                ref={provided.innerRef}>
                                {this.state.second_region_items.map((item, index) => (
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
