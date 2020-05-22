import React, { Component } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio } from '@fortawesome/free-regular-svg-icons';

// components
import SlideColumn from '../Slide/Columns';
import SlideFeature from '../Slide/Features';
import SlideEditor from '../Slide/Editor';

class SlideHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            column: this.props.currentColumns ? this.props.currentColumns : [],
            columnSizes: [
                { id: 0,items: [{ size: "1/1", class: "sg-1-1"}]},
                { id: 1,items: [{ size: "1/2", class: "sg-1-2"}, { size: "1/2", class: "sg-1-2"}]},
                { id: 2,items: [{ size: "1/3", class: "sg-1-3"}, { size: "2/3", class: "sg-2-3"}]},
                { id: 3,items: [{ size: "2/3", class: "sg-2-3"}, { size: "1/3", class: "sg-1-3"}]},
                { id: 4,items: [{ size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}]},
                { id: 5,items: [{ size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}]},
                { id: 6,items: [{ size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}]},
            ],
            features: [
                { type: 'audio', name: 'Audio', icon: faFileAudio, },
                { type: 'content-area', name: 'Content Area', icon: faSquare, },
            ],
            activeFeature: '',
            activeTab: 'column',
        };
        
        this.setModalShow = this.setModalShow.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.handleSizeActive = this.handleSizeActive.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidUpdate() {
        console.log('state.columns: ');
        console.log(this.state.column);
        console.log('props.columns: ');
        console.log(this.props.currentColumns);
        console.log('props.action');
        console.log(this.props.action);
    }

    setModalShow = (value, action) => {
        
        this.setState({
            modalShow: value,
        });

        if (!value && (action === "close" || action === "edit")) {
            console.log('Edit here');
            this.setState({
                column: this.props.currentColumns ? this.props.currentColumns : [],
            });
        }

        if (!value && (action === "add")) {
            this.setState({
                column: [],
            });
        }
    }

    addColumn = () => {
        const currentCount = this.state.column.length + 1
        const columnObj = { type: 'column', name: 'Column ' + currentCount, active: -1, sizeId: -1, id: 'column' + currentCount, content: [] }

        this.setState({
            column: [...this.state.column, columnObj],
        });
    }

    deleteColumn = (index) => {
        console.log('index:');
        console.log(index);
        const columnArr = [...this.state.column];
        columnArr.splice(index, 1);

        this.setState({
            column: columnArr,
        })
    }
    
    handleContentEditable = (event, index) => {
        const columnObj = this.state.column;

        columnObj[index].name = event.target.value;

        this.setState({
            column: columnObj,
        })
    }

    handleSizeActive = (columnIndex, sizeIndex, sizeId) => {
        const columnSizesObj = this.state.column;

        columnSizesObj[columnIndex].active = sizeIndex;
        columnSizesObj[columnIndex].sizeId = sizeId;

        this.setState({
            column: columnSizesObj,
        })
    }

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
            const currentColumnList = this.state.column;

            const reordered_slides = this.reorder(
                currentColumnList,
                source.index,
                destination.index
            );
            let columns = reordered_slides;

            this.setState({
                column: columns,
            })
        }

        if (source.droppableId === "features") {
            const currentColumns = this.state.column;

            this.setActiveTab("editor");

            for (var key in currentColumns) {
                if (destination.droppableId === currentColumns[key]['id']) {
                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;
                    
                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '' };
                        currentColumns[key].content = [currentContent];
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '' };
                        currentColumns[key].content = [currentContent];
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                        })
                    }
                    
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-1')) {
                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-2')) {
                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                }
            }
        }
    }

    setActiveTab = (value) => {
        this.setState({
            activeTab: value,
        })
    }

    onSave = (slide, columns, slideId) => {
        if (this.props.action === "add") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.addSlideChange(slideObj, slideId);
            console.log("add");
        } else if (this.props.action === "edit") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.editSlideChange(slideObj, slideId, this.props.currentClickedLessonId);
            console.log("edit");
        }
        
        this.setModalShow(false, 'save')
    }

    render() {
        const slideModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false, 'close')}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="slide-modal-width"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.action === "add" ?
                            <span>Add Slide</span>
                            :
                            <span>Edit Slide</span>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ 
                            slideName: this.props.currentSlideName ? this.props.currentSlideName : '',
                            showTitle: this.props.showTitleValue,
                        }}

                        onSubmit={values => {
                            console.log(values.slideName);
                            console.log(values.showTitle);
                            this.onSave(values.slideName, this.state.column, this.props.slideId);
                        }}
                    >
                        {props => {
                            const {
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="slideName">Slide Name:</label>
                                    <input
                                        id="slideName"
                                        name="slideName"
                                        type="text"
                                        className="form-control d-inline"
                                        onChange={handleChange}
                                        value={values.slideName}
                                        onBlur={handleBlur}
                                        placeholder="Type slide name here (Optional) . . ."
                                    />
                                    <input
                                        id="showTitle"
                                        name="showTitle"
                                        type="checkbox"
                                        value={true}
                                        checked={values.showTitle === true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="showTitle" className="ml-1"> Display Title</label>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <div className="row">
                                            <div id="slide-sidebar" className="col-md-3 pr-0">
                                                <Tabs activeKey={this.state.activeTab} onSelect={this.setActiveTab} id="uncontrolled-tab" className="text-center">
                                                    <Tab eventKey="column" title="Column" className="mt-3">
                                                        <div className="sg-workspace-content-section">
                                                            {
                                                                this.state.column.length !== 0 ?
                                                                    <Droppable droppableId="columns">
                                                                        {(provided) => (
                                                                            <div ref={provided.innerRef}>
                                                                                {this.state.column.map((item, columnIndex) => (
                                                                                    <Draggable
                                                                                        key={'column-draggable-' + columnIndex}
                                                                                        draggableId={'column-' + columnIndex}
                                                                                        index={columnIndex}>
                                                                                        {(provided) => (
                                                                                            <div
                                                                                                ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                            >
                                                                                                <SlideColumn 
                                                                                                    columnIndex={columnIndex}
                                                                                                    name={item.name}
                                                                                                    deleteColumn={this.deleteColumn}
                                                                                                    columnSizes={this.state.columnSizes}
                                                                                                    column={this.state.column}
                                                                                                    handleSizeActive={this.handleSizeActive}
                                                                                                />
                                                                                            </div>
                                                                                        )}
                                                                                    </Draggable>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </Droppable>
                                                                :
                                                                <span></span>
                                                            }

                                                            <button type="button" className="sg-add-sortable-item-after" onClick={this.addColumn}><span><FontAwesomeIcon icon={faPlus}/>Add Column</span></button>
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey="features" title="Features" className="mt-3">
                                                        <Droppable droppableId="features">
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} className="sg-element-library">
                                                                    {this.state.features.map((item, featureIndex) => (
                                                                        <Draggable
                                                                            key={'feature-draggable-' + featureIndex}
                                                                            draggableId={'feature-' + featureIndex}
                                                                            index={featureIndex}
                                                                        >
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className="sg-element-library-item"
                                                                                >
                                                                                    <SlideFeature
                                                                                        icon={item.icon}
                                                                                        name={item.name}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </Tab>
                                                    <Tab eventKey="editor" title="Editor" className="mt-3">
                                                        <SlideEditor feature={this.state.activeFeature}/>
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                            <div id="slide-content" className="col-md-9 pl-0">
                                                <div id="slide-content-container" className="border p-3 h-100">
                                                    {
                                                        this.state.column.length > 0 ?
                                                            this.state.column.map((item, index) => (
                                                                item.sizeId === 0 || item.sizeId === -1 ?
                                                                    <Droppable key={index} droppableId={item.id}>
                                                                        {(provided) => (
                                                                            <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                <div id={index} className="p-5 text-center sg-column mt-2">
                                                                                    {item.name}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Droppable>
                                                                :
                                                                    item.sizeId === 1 ?
                                                                        <div  className="container p-0 pb-3">
                                                                            <div className="row w-100 m-0">
                                                                                <Droppable key={index} droppableId={item.id + '-sg-1-2-1'}>
                                                                                    {(provided) => (
                                                                                        <div ref={provided.innerRef} id={index} className="d-inline p-5 text-center sg-column sg-1-2">
                                                                                            {item.name}
                                                                                        </div>
                                                                                    )}
                                                                                </Droppable>
                                                                                <Droppable key={index} droppableId={item.id + '-sg-1-2-2'}>
                                                                                    {(provided) => (
                                                                                        <div ref={provided.innerRef} id={index} className="d-inline p-5 text-center sg-column sg-1-2">
                                                                                            {item.name}
                                                                                        </div>
                                                                                    )}
                                                                                </Droppable>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        item.sizeId === 2 ?
                                                                            <Droppable key={index} droppableId={item.id}>
                                                                                {(provided) => (
                                                                                    <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                        <div className="row w-100 m-0">
                                                                                            <div id={index} className="d-inline p-5 text-center sg-column sg-1-3">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={index} className="d-inline p-5 text-center sg-column sg-2-3">
                                                                                                {item.name}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Droppable>
                                                                        :
                                                                            item.sizeId === 3 ?
                                                                                <Droppable key={index} droppableId={item.id}>
                                                                                    {(provided) => (
                                                                                        <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                            <div className="row w-100 m-0">
                                                                                                <div id={index} className="d-inline p-5 text-center sg-column sg-2-3">
                                                                                                    {item.name}
                                                                                                </div>
                                                                                                <div id={index} className="d-inline p-5 text-center sg-column sg-1-3">
                                                                                                    {item.name}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Droppable>
                                                                            :
                                                                                item.sizeId === 4 ?
                                                                                    <Droppable key={index} droppableId={item.id}>
                                                                                        {(provided) => (
                                                                                            <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                                <div className="row w-100 m-0">
                                                                                                    <div id={index} className="d-inline p-5 text-center sg-column sg-1-3">
                                                                                                        {item.name}
                                                                                                    </div>
                                                                                                    <div id={index} className="d-inline p-5 text-center sg-column sg-1-3">
                                                                                                        {item.name}
                                                                                                    </div>
                                                                                                    <div id={index} className="d-inline p-5 text-center sg-column sg-1-3">
                                                                                                        {item.name}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                :
                                                                                    item.sizeId === 5 ?
                                                                                        <Droppable key={index} droppableId={item.id}>
                                                                                            {(provided) => (
                                                                                                <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                                    <div className="row w-100 m-0">
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-4">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-4">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-4">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-4">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Droppable>
                                                                                    :
                                                                                        <Droppable key={index} droppableId={item.id}>
                                                                                            {(provided) => (
                                                                                                <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                                    <div className="row w-100 m-0">
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-5">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-5">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-5">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-5">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                        <div id={index} className="d-inline p-5 text-center sg-column sg-1-5">
                                                                                                            {item.name}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Droppable>
                                                            ))
                                                        :
                                                        <span></span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </DragDropContext>
                                    <button type="submit" className="btn btn-success float-right mt-2">Save</button>
                                </form>
                            );
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        );

        return (
            <div id="slide-handler-container" className="d-inline">
                {this.props.action === "add" ?
                    <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true, 'add')}>Add Slide</button>
                :
                    <div id="edit-slide-btn" className="d-inline">
                        <button type="button" className="btn btn-link pl-0" onClick={() => this.setModalShow(true, 'edit')}>| Edit</button>
                    </div>
                }
                {slideModal}
            </div>
        )
    }
}

export default SlideHandler;
