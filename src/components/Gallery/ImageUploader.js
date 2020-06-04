import React, { Component } from 'react';

// https://codepen.io/hartzis/pen/VvNGZP
class ImageUploader extends Component {
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
          // this.setState({
          //   file: file,
          //   imagePreviewUrl: reader.result
          // });
        }
      });
    }
  
    render() {
      // let {imagePreviewUrl} = this.state;
      // let $imagePreview = null;
      // if (imagePreviewUrl) {
      //   $imagePreview = (<img src={imagePreviewUrl} alt="sample"/>);
      // }

      // console.log(this.state.file);
      // console.log(this.state.imagePreviewUrl);
  
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleImageChange} multiple/>
            <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
          </form>
          {/* {$imagePreview} */}
        </div>
      )
    }
  
  }

  export default ImageUploader;