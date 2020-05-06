import React, { Component } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

// components
import CheckBoxInput from '../Generator/CheckBoxInput';

class SlideHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            slideName: this.props.currentSlideName,
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    onSave = (slideName, id) => {
        if (this.props.action === "add") {
            this.props.addSlideChange(slideName, id);
            console.log("add");
        } else if (this.props.action === "edit") {
            this.props.editSlideChange(slideName, id);
            console.log("edit");
        }
        
        this.setModalShow(false)
    }

    render() {
        const slideModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
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
                            slideName: this.state.slideName ? this.state.slideName : '',
                        }}

                        onSubmit={values => {
                            console.log(values.slideName);
                            this.onSave(values.slideName, this.props.id);
                        }}

                        // validationSchema={Yup.object().shape({
                        //     slideName: Yup.string()
                        //         .required("Slide name required"),
                        //     }
                        // )}
                    >
                        {props => {
                            const {
                            values,
                            touched,
                            errors,
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
                                        className={(errors.slideName && touched.slideName && "error form-control d-inline") || "form-control d-inline"}
                                        onChange={handleChange}
                                        value={values.slideName}
                                        onBlur={handleBlur}
                                        placeholder="Type slide name here (Optional) . . ."
                                    />
                                    <CheckBoxInput label="Display Title" />
                                    {errors.slideName && touched.slideName && (
                                        <div className="input-feedback">{errors.slideName}</div>
                                    )}
                                    <div className="row">
                                        <div id="slide-sidebar" className="col-md-5 pr-0">
                                            <Tabs defaultActiveKey="column" id="uncontrolled-tab">
                                                <Tab eventKey="column" title="Column" className="mt-3">
                                                    <span>Those lips that Love's own hand did make, Breathed forth the sound that said 'I hate', To me that languish'd for her sake: But when she saw my woeful state, Straight in her heart did mercy come, Chiding that tongue that ever sweet Was us'd in giving gentle doom; And taught it thus anew to greet; 'I hate' she alter'd with an end, That followed it as gentle day,</span>
                                                </Tab>
                                                <Tab eventKey="features" title="Features" className="mt-3">
                                                    <span>To me that languish'd for her sake: But when she saw my woeful state, </span>
                                                </Tab>
                                                <Tab eventKey="editor" title="Editor" className="mt-3">
                                                    <span>Straight in her heart did mercy come, Chiding that tongue that ever sweet Was us'd in giving gentle doom; And taught it thus anew to greet; 'I hate' she alter'd with an end, That followed it as gentle day,</span>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                        <div id="slide-content" className="col-md-7 pl-0">
                                            
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
                    <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true)}>Add Slide</button>
                :
                    <div id="edit-slide-btn" className="d-inline">
                        <button type="button" className="btn btn-link pl-0" onClick={() => this.setModalShow(true)}>| Edit</button>
                    </div>
                }
                {slideModal}
            </div>
        )
    }
}

export default SlideHandler;
