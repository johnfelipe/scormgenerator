import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../services';

// https://codepen.io/hartzis/pen/VvNGZP
class MediaUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccessMsg: false,
            showErrorMsg: false,
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.clearSuccessMessage = this.clearSuccessMessage.bind(this);
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let files = e.target.files;
        console.log(files);

        // eslint-disable-next-line
        Object.keys(files).map((fileIndex) => {

            if(files[fileIndex].type.includes('image') || files[fileIndex].type.includes('video') || files[fileIndex].type.includes('audio')) {
                const formData = new FormData();

                formData.append('file', files[fileIndex]);
                formData.append('uid', 1);
                formData.append('alt', files[fileIndex].name);

                galleryService.uploadFiles(formData)
                .then(
                    fileObject => {
                        console.log(fileObject);
                        this.props.setMediaFiles(fileObject);
                    },
                    error => console.log(error)
                );

                this.setState({
                    showSuccessMsg: true,
                })
            } else {
                document.getElementById("inputGroupFile01").value = "";
                this.setState({
                    showErrorMsg: true,
                })
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
            //     this.props.setMediaFiles(fileObject);
            // }
        });
    }

    clearSuccessMessage = () => {
        setTimeout(
            function() {
                this.setState({showSuccessMsg: false, showErrorMsg: false});
            }
            .bind(this),
            5000
        );
    }

    render() {

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
                                onChange={this.handleImageChange}
                                onBlur={this.clearSuccessMessage}
                                // multiple
                            />
                            <label className="custom-file-label pr-6" htmlFor="inputGroupFile01">
                                {
                                    this.state.showSuccessMsg ?
                                        <span className="text-success">File are successfully uploaded!</span>
                                    :
                                        this.state.showErrorMsg ?
                                            <span className="text-danger">File are not uploaded!</span>
                                        :
                                            <span>Choose file/s</span>
                                }
                            </label>
                        </div>
                    </div>
                    <div id="success-message" className={this.state.showSuccessMsg ? 'fadeIn mt-5' : 'fadeOut mt-5'}>
                        <Alert variant='success'>
                            <span><FontAwesomeIcon icon={faCheck}/> Successfully uploaded!</span>
                        </Alert>
                    </div>
                    <div id="error-message" className={this.state.showErrorMsg ? 'fadeIn mt-5' : 'fadeOut mt-5'}>
                        <Alert variant='danger'>
                            <span><FontAwesomeIcon icon={faTimes}/> Cannot upload selected file!</span>
                        </Alert>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }

}

export default MediaUploader;