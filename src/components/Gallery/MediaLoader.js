import React, { Component } from 'react';

class MediaLoader extends Component {
  
    render() {

      return (
        <img src={this.props.dataUrl} alt={this.props.fileName} className="w-25 h-25 mr-3 mt-3"/>
      )
    }
  
  }

  export default MediaLoader;