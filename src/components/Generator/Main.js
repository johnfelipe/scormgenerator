import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

// components
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput';
import CheckBoxInput from './CheckBoxInput';
import ResourcesUpload from './ResourcesUpload';
import TranscriptUpload from './TranscriptUpload';

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
                            <SelectInput />
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="float-right mt-2">
                                <CheckBoxInput />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mt-2">
                            <ResourcesUpload />
                        </div>
                        <div className="col-md-4 mt-2">
                            <TranscriptUpload />
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="float-right">
                                <label for="glossaryBtn" className="mr-2">Add Glossary (Optional):</label>
                                <button type="button" className="btn btn-outline-dark">Glossary</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-2">
                            <div id="lesson-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
