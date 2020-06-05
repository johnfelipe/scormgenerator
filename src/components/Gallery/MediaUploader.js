import React, { Component } from 'react';

// https://codepen.io/hartzis/pen/VvNGZP
class MediaUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();
        let files = e.target.files;

        Object.keys(files).map((fileIndex) => {

            let reader = new FileReader();

            const fileObject = {
                name: files[fileIndex].name,
                size: files[fileIndex].size,
                type: files[fileIndex].type,
                lastModified: files[fileIndex].lastModified,
                lastModifiedDate: files[fileIndex].lastModifiedDate,
            };

            this.props.setMediaFiles(fileObject, fileIndex);

            reader.readAsDataURL(files[fileIndex])
            reader.onloadend = () => {

                const urlObject = {
                    name: files[fileIndex].name,
                    dataUrl: reader.result
                };

                this.props.setMediaUrls(urlObject);
            }
        });
    }

    render() {

        return (
            <div>
                {/* <form onSubmit={this._handleSubmit}> */}
                <input type="file" onChange={this._handleImageChange} multiple />
                {/* </form> */}
            </div>
        )
    }

}

export default MediaUploader;