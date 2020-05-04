import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
            courseLogo: '',
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div id="generator-container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3>Try it out!</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                className="form-control"
                                placeholder="Type course name here . . ."
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                id="courseLogo"
                                name="courseLogo"
                                type="file"
                                className="form-control"
                                accept="image/x-png,image/gif,image/jpeg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
