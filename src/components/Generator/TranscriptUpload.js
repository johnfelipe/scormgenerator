import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class TranscriptUpload extends Component {

    render() {
        return (
            <div id="transcript-btn-container" className="text-center">
                <label for="transcriptBtn" className="mr-2">Upload Transcript (Optional):</label>
                <button type="button" className="btn btn-outline-dark">Transcript</button>
            </div>
        )
    }
}

export default TranscriptUpload;
