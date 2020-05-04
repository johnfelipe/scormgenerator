import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class AddLesson extends Component {

    render() {
        return (
            <div id="add-lesson-container" className="float-left">
                <button type="button" className="btn btn-success">Add Lesson</button>
            </div>
        )
    }
}

export default AddLesson;
