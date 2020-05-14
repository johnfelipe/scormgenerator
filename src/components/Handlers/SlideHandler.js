import React, { Component } from 'react';
import { Accordion, Card, Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";

class SlideHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            column: this.props.currentColumns ? this.props.currentColumns : [],
        };
        
        this.setModalShow = this.setModalShow.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidUpdate() {
        console.log('state.columns: ');
        console.log(this.state.column);
        console.log('props.columns: ');
        console.log(this.props.currentColumns);
    }

    setModalShow = (value, action) => {
        
        this.setState({
            modalShow: value,
        });

        if (!value && (action === "close")) {
            this.setState({
                column: this.props.currentColumns ? this.props.currentColumns : [],
            });
        }
    }

    addColumn = () => {
        const currentCount = this.state.column.length + 1
        const columnObj = { type: 'column', name: 'Column ' + currentCount }

        this.setState({
            column: [...this.state.column, columnObj],
        });
    }

    onSave = (slide, columns, id) => {
        if (this.props.action === "add") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.addSlideChange(slideObj, id);
            console.log("add");
        } else if (this.props.action === "edit") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.editSlideChange(slideObj, id, this.props.currentClickedLessonId);
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
                            this.onSave(values.slideName, this.state.column, this.props.id);
                        }}
                    >
                        {props => {
                            const {
                            values,
                            isSubmitting,
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
                                        // checked={values.showTitle === true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="showTitle" className="ml-1"> Display Title</label>
                                    <div className="row">
                                        <div id="slide-sidebar" className="col-md-3 pr-0">
                                            <Tabs defaultActiveKey="column" id="uncontrolled-tab" className="text-center">
                                                <Tab eventKey="column" title="Column" className="mt-3">
                                                    {
                                                        this.state.column.length !== 0 ?
                                                        this.state.column.map((item, index) => (
                                                            <>
                                                                <Accordion key={index} className="mb-2">
                                                                    <Card>
                                                                        <Accordion.Toggle as={Card.Header} eventKey="0" className="section-header p-2">
                                                                            {item.name}
                                                                        </Accordion.Toggle>
                                                                        <Accordion.Collapse eventKey="0">
                                                                            <Card.Body className="section-body">
                                                                                This will contain the rows and different kind of splitting a row just like in cornerstone.
                                                                            </Card.Body>
                                                                        </Accordion.Collapse>
                                                                    </Card>
                                                                </Accordion>
                                                            </>
                                                        ))
                                                        :
                                                        <span></span>
                                                    }

                                                    <button type="button" className="sg-add-sortable-item-after" onClick={this.addColumn}>Add Column</button>

                                                </Tab>
                                                <Tab eventKey="features" title="Features" className="mt-3">
                                                    <span>To me that languish'd for her sake: But when she saw my woeful state, </span>
                                                </Tab>
                                                <Tab eventKey="editor" title="Editor" className="mt-3">
                                                    <span>Straight in her heart did mercy come, Chiding that tongue that ever sweet Was us'd in giving gentle doom; And taught it thus anew to greet; 'I hate' she alter'd with an end, That followed it as gentle day,</span>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                        <div id="slide-content" className="col-md-9 pl-0">
                                            <div id="slide-content-container" className="h-100">

                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success float-right mt-2" disabled={isSubmitting}>Save</button>
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
