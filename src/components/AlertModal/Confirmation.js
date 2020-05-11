import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Confirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    render() {
        const confirmationModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Sample alert</span>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={() => this.setModalShow(false)}>Okay</button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <div id="save-btn-container" className="float-right">
            {/* //     {this.props.action === "add" ?
            //         <div id="add-lesson-btn" className="float-left">
            //             <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true)}>Add Lesson</button>
            //         </div>
            //     : */}
                    
                        <button type="submit" className="btn btn-success" disabled={this.props.isSubmitting} onClick={() => this.setModalShow(true)}>Save</button>
                    
            {/* //     } */}
                {confirmationModal}
            </div>
        )
    }
}

export default Confirmation;