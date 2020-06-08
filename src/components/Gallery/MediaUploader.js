import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

// https://codepen.io/hartzis/pen/VvNGZP
class MediaUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccessMsg: false,
        };
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidUpdate = () => {
        setTimeout(
            function() {
                this.setState({showSuccessMsg: false});
            }
            .bind(this),
            5000
        );
    }

    handleImageChange(e) {
        e.preventDefault();
        let files = e.target.files;

        this.setState({
            showSuccessMsg: true,
        })

        // eslint-disable-next-line
        Object.keys(files).map((fileIndex) => {

            let reader = new FileReader();

            const fileObject = {
                name: files[fileIndex].name.split(".")[0],
                extension: files[fileIndex].name.split(".")[1],
                size: files[fileIndex].size,
                type: files[fileIndex].type,
                lastModified: files[fileIndex].lastModified,
                lastModifiedDate: files[fileIndex].lastModifiedDate,
            };

            reader.readAsDataURL(files[fileIndex])
            reader.onloadend = () => {
                fileObject.dataUrl = reader.result;
            }

            this.props.setMediaFiles(fileObject);
        });
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
                                multiple
                            />
                            <label className="custom-file-label pr-6" htmlFor="inputGroupFile01">
                                {
                                    this.state.showSuccessMsg ?
                                        <span className="text-success">Files are successfully uploaded!</span>
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
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }

}

export default MediaUploader;