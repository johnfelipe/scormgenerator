import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../services';

// modal
import AltTagForm from '../AlertModal/AltTagForm';

// https://codepen.io/hartzis/pen/VvNGZP
function MediaUploader(props) {

    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');

    const handleFileUpload = (e) => {
        let files = e.target.files;
        console.log(files);

        // eslint-disable-next-line
        Object.keys(files).map((fileIndex) => {

            if(files[fileIndex].type.includes('video') || files[fileIndex].type.includes('audio')) {
                const formData = new FormData();

                formData.append('file', files[fileIndex]);
                formData.append('uid', 1);
                formData.append('alt', files[fileIndex].name);

                galleryService.uploadFiles(formData)
                .then(
                    fileObject => {
                        console.log(fileObject);
                        props.setMediaFiles(fileObject);
                    },
                    error => console.log(error)
                );

                setShowSuccessMsg(true);
            } else if (files[fileIndex].type.includes('image')) {
                setModalShow(true);
                setFile(files);
                setFileIndex(fileIndex);

                let reader = new FileReader();

                reader.readAsDataURL(files[fileIndex])
                reader.onloadend = () => {
                    setImgUrlPreview(reader.result);
                }
            } else {
                document.getElementById("inputGroupFile01").value = "";
                setShowErrorMsg(true);
            }
            

            // let reader = new FileReader();

            // const fileObject = {
            //     name: files[fileIndex].name.split(".")[0],
            //     extension: files[fileIndex].name.split(".")[1],
            //     size: files[fileIndex].size,
            //     type: files[fileIndex].type,
            //     lastModified: files[fileIndex].lastModified,
            //     lastModifiedDate: files[fileIndex].lastModifiedDate,
            // };

            // reader.readAsDataURL(files[fileIndex])
            // reader.onloadend = () => {
            //     fileObject.url = reader.result;
            //     props.setMediaFiles(fileObject);
            // }
        });
    }

    const handleImageUpload = (mediaAlt, file, fileIndex) => {
        if (modalShow ) { 
            const formData = new FormData();

            formData.append('file', file[fileIndex]);
            formData.append('uid', 1);
            formData.append('alt', mediaAlt);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    props.setMediaFiles(fileObject);
                },
                error => console.log(error)
            );

            setShowSuccessMsg(true);
        }
    }

    const clearSuccessMessage = () => {
        setTimeout(
            function() {
                
                setShowSuccessMsg(false);
                setShowErrorMsg(false);
            },
            5000
        );
    }

    return (
        <div className="row mt-5">
            <div className="col-md-4"></div>
            <div className="text-center col-md-4">
                <div className="input-group">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={handleFileUpload}
                            onBlur={clearSuccessMessage}
                            // multiple
                        />
                        <label className="custom-file-label pr-6" htmlFor="inputGroupFile01">
                            {
                                showSuccessMsg ?
                                    <span className="text-success">File are successfully uploaded!</span>
                                :
                                    showErrorMsg ?
                                        <span className="text-danger">File are not uploaded!</span>
                                    :
                                        <span>Choose file/s</span>
                            }
                        </label>
                    </div>
                </div>
                <div id="success-message" className={showSuccessMsg ? 'fadeIn mt-5' : 'fadeOut mt-5'}>
                    <Alert variant='success'>
                        <span><FontAwesomeIcon icon={faCheck}/> Successfully uploaded!</span>
                    </Alert>
                </div>
                <div id="error-message" className={showErrorMsg ? 'fadeIn mt-5' : 'fadeOut mt-5'}>
                    <Alert variant='danger'>
                        <span><FontAwesomeIcon icon={faTimes}/> Cannot upload selected file!</span>
                    </Alert>
                </div>
            </div>
            <div className="col-md-4"></div>
            <AltTagForm
                imgUrlPreview={imgUrlPreview}
                file={file}
                fileIndex={fileIndex}
                handleImageUpload={handleImageUpload}
                modalShow={modalShow}
                setModalShow={setModalShow}
            />
        </div>
    );

}

export default MediaUploader;