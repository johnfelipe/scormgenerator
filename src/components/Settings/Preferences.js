import React, { useState } from 'react';
import { Modal, Dropdown, Tab, Nav, Form } from 'react-bootstrap';

function Preferences() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const preferencesModal = (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Preferences</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Sample preferences settings here
                <Tab.Container defaultActiveKey="first">
                    <div className="row">
                        <div className="col-sm-3">
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className="p-2">Update</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className="col-sm-9 webupps-vertical-center">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Form.Check type="checkbox" label="Auto Update" />
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </div>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    )
    return (
        <>
            <Dropdown.Item
                role="button"
                onClick={ () => {
                        if (show) {
                            handleClose();
                        } else {
                            handleShow();
                        }
                        console.log(show)
                    }
                }
            >
                Preferences
            </Dropdown.Item>
            {preferencesModal}
        </>
    );
}

export default Preferences;
