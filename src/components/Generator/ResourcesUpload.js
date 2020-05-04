import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class ResourcesUpload extends Component {

    render() {
        return (
            <div id="resources-btn-container">
                <label htmlFor="resourcesBtn" className="mr-2">Upload Resources (Optional):</label>
                <button type="button" className="btn btn-outline-dark">Resources</button>
            </div>
        )
    }
}

export default ResourcesUpload;
