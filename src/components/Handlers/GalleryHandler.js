import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';

// redux library
import { useSelector, useDispatch } from 'react-redux';

// actions
import { galleryActions } from '../../actions';

// Gallery Components
import MediaUploader from '../Gallery/MediaUploader';
import MediaLoader from '../Gallery/MediaLoader';

function GalleryHandler(props) {

    const { uid } = props;
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [key, setKey] = useState('uploadFiles');
    const [filterType, setFilterType] = useState(false);
    const mediaFilesObject = useSelector(state => state.gallery.mediaFiles ? state.gallery.mediaFiles : []);
    const currentFile = useSelector(state => state.gallery.currentFile ? state.gallery.currentFile : {});
    const galleryMsg = useSelector(state => state.gallery.message ? state.gallery.message : '');

    useEffect(() => {
        if (modalShow === false) {
            setFilterType("all");
        }
    }, [modalShow, mediaFilesObject]);

    useEffect(() => {
        dispatch(galleryActions.getAllFiles());
    }, [dispatch, currentFile, galleryMsg]);

    const galleryModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="gallery-modal w-90"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Media
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="uploadFiles" title="Upload Files">
                        <MediaUploader
                            // setMediaFiles={setMediaFiles}
                            // setMediaFilesObject={props.setMediaFilesObject}
                            uid={uid}
                        />
                    </Tab>
                    <Tab eventKey="mediaLibrary" title="Media Library">
                        {
                            mediaFilesObject.length > 0 ?
                                <>
                                    <div className="gallery-toolbar">
                                        <div className="gallery-toolbar-filter">
                                            <h2 className="gallery-filter-heading">Filter Gallery</h2>
                                            <select id="gellery-attachment-filters" onChange={(e) => setFilterType(e.target.value)} className="gallery-filters">
                                                <option value="all">All media items</option>
                                                <option value="image">Images</option>
                                                <option value="audio">Audio</option>
                                                <option value="video">Video</option>
                                            </select>
                                        </div>
                                    </div>
                                    <MediaLoader
                                        mediaFiles={mediaFilesObject}
                                        // deleteMedia={deleteMedia}
                                        filterType={filterType}
                                        uid={uid}
                                    />
                                </>
                            :
                                <div className="p-3">No files found</div>
                        }
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );

    return (
        <div id="gallery-btn-container">
            {props.location === "home" ?
                <>
                    <label htmlFor="galleryBtn" className="mr-2">Add Gallery Files:</label>
                    <button type="button" className="btn btn-outline-dark" onClick={() => setModalShow(true)}>{props.buttonName}</button>
                </>
            :
                <>
                    <button type="button" className="btn btn-primary w-100" onClick={() => setModalShow(true)}>{props.buttonName}</button>
                </>
            }
            {galleryModal}
        </div>
    )
}

export default GalleryHandler;
