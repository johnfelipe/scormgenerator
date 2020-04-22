import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

// data
import data from '../../slide.json';

class Generator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feature_items: [...data.feature.text, ...data.feature.video],
            first_region_items: [],
            second_region_items: [],
            modalShow: false,
            index: 0,
            clickedRegion: '',
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onSave = this.onSave.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
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
            } else if (source.droppableId === "firstRegion" && this.state.second_region_items.length !== data.layout.region.length && destination.droppableId === "secondRegion") {
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
            } else if (source.droppableId === "secondRegion" && this.state.first_region_items.length !== data.layout.region.length && destination.droppableId === "firstRegion") {
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

    removeItem = (regionId, index) => {
        console.log('Clicked!');
        console.log(regionId);
        console.log(index);

        if (regionId === "firstRegion") {
            let source = {
                index: index,
                droppableId: regionId,
            }

            let destination = {
                index: 0,
                droppableId: "features",
            }
            const result = this.move(
                this.getList(regionId),
                this.getList("features"),
                source,
                destination
            );

            this.setState({
                feature_items: result.features,
                first_region_items: result.firstRegion,
            });
        } else if (regionId === "secondRegion") {
            let source = {
                index: index,
                droppableId: regionId,
            }

            let destination = {
                index: 0,
                droppableId: "features",
            }
            const result = this.move(
                this.getList(regionId),
                this.getList("features"),
                source,
                destination
            );

            this.setState({
                feature_items: result.features,
                second_region_items: result.secondRegion,
            });
        }
    }

    clearAll = () => {
        //Uses spread operator to merge array
        this.setState({
            feature_items: [...this.state.feature_items, ...this.state.first_region_items, ...this.state.second_region_items],
            first_region_items: [],
            second_region_items: [],
        });
    };
    
    setModalShow = (value, index, clickedRegion) => {
        this.setState({
            modalShow: value,
            index: index,
            clickedRegion: clickedRegion,
        });
    }

    render() {  
        return (
            <div className="container-fluid">
                <div className="drag-drop-container mt-3">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="features" direction="horizontal">
                            {(provided) => (
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
                            {(provided) => (
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
                                                    text={item.text ? item.text : 'none'}

                                                    onClick={() => this.setModalShow(true, index, 'firstRegion')}

                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.style ?
                                                        <>
                                                            <span>{item.style}</span>
                                                            {item.text ? 
                                                                <span className="ml-4">text: {item.text}</span>
                                                                :
                                                                <span className="ml-4">text: </span>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {item.type}
                                                        </>
                                                    }
                                                    <button className="btn btn-danger float-right region-item-close-btn" onClick={() => this.removeItem("firstRegion", index)} title="Remove"><FontAwesomeIcon icon={faWindowClose} /></button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="secondRegion">
                            {(provided) => (
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
                                                    text={item.text ? item.text : 'none'}

                                                    onClick={() => this.setModalShow(true, index, 'secondRegion')}

                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.style ?
                                                        <>
                                                            <span>{item.style}</span>
                                                            {item.text ? 
                                                                <span className="ml-4">text: {item.text}</span>
                                                                :
                                                                <span className="ml-4">text: </span>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {item.type}
                                                        </>
                                                    }
                                                    <button className="btn btn-danger float-right region-item-close-btn" onClick={() => this.removeItem("secondRegion", index)} title="Remove"><FontAwesomeIcon icon={faWindowClose} /></button>
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
                    <button onClick={this.clearAll} className="btn btn-outline-primary mt-2 ml-2" >Clear</button>
                </div>

                {/* Text Editor Modal */}
                <Modal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Text
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!' );
                                editor.editing.view.focus();
                            } }
                            onChange={ ( event, editor ) => {
                                if (this.state.clickedRegion === 'firstRegion') {
                                    let obj = this.state.first_region_items[this.state.index];
                                    obj.text = editor.getData();
                                } else if (this.state.clickedRegion === 'secondRegion') {
                                    let obj = this.state.second_region_items[this.state.index];
                                    obj.text = editor.getData();
                                }
                                
                            } }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setModalShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Generator;
