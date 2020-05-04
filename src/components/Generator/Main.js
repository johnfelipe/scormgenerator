import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
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
                                id="myfile"
                                name="myfile"
                                type="file"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
