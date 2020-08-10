import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

// components
import ListModals from '../Features/List/ListModals';

function ListModalLayout(props) {

    const { output, styles } = props;

    const [modalShow, setModalShow] = useState(false);

    const buttonModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Sample title
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Sample content
            </Modal.Body>
        </Modal>
    );
    
    return (
        <div id="list-layout">
            <div className={"list-container h-100 w-100 border border-light p-3 " + styles.btnPosition}>
                {output.length > 0 ?
                    <>
                        {output.map((item, index) => (
                            <ListModals
                                item={item}
                                index={index}
                                styles={styles}
                            />
                        ))}
                    </>
                :
                    <span>No content added yet.</span>
                }
            </div>
            {buttonModal}
        </div>
    );
}

export default ListModalLayout;
