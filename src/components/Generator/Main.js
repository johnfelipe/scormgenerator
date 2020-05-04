import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

// components
import TextInput from './TextInput';
import FileInput from './FileInput';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseTitle: '',
            courseLogo: '',
            navigationType: '',
            showProgressbar: '',
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
                            <TextInput />
                        </div>
                        <div className="col-md-3">
                            <FileInput />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mt-2">
                            <label for="navigationType" className="mr-1">Choose Navigation Type:</label>
                            <select id="navigationType" className="form-control d-inline w-25">
                                <option value="sidebar">Sidebar</option>
                                <option value="dropdownSelect">Dropdown Select</option>
                                <option value="hamburgerMenu">Hamburger Menu</option>
                            </select>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="float-right mt-2">
                                <input
                                    id="showProgressbar"
                                    name="showProgressbar"
                                    type="checkbox"
                                    value="true"/>
                                <label for="showProgressbar" className="ml-1"> Show/Hide Progress Bar</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <label for="resourcesBtn" className="mr-2">Upload Resources (Optional):</label>
                            <button type="button" className="btn btn-primary">Resources</button>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="text-center">
                                <label for="transcriptBtn" className="mr-2">Upload Transcript (Optional):</label>
                                <button type="button" className="btn btn-primary">Transcript</button>
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="float-right">
                                <label for="glossaryBtn" className="mr-2">Add Glossary (Optional):</label>
                                <button type="button" className="btn btn-primary">Glossary</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
