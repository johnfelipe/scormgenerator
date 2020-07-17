import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ChangeGrid extends Component {

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
                        Warning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Features exists in this column grid. Do you want to remove all features and change grid size?</span>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-priamry" onClick={() => this.setModalShow(false)}>Yes</button>
                    <button className="btn btn-danger" onClick={() => this.setModalShow(false)}>No</button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <>
                {confirmationModal}
            </>
        )
    }
}

export default ChangeGrid;