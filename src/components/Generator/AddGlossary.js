import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class AddGlossary extends Component {

    render() {
        return (
            <div id="add-glossary-container" className="float-right">
                <label for="glossaryBtn" className="mr-2">Add Glossary (Optional):</label>
                <button type="button" className="btn btn-outline-dark">Glossary</button>
            </div>
        )
    }
}

export default AddGlossary;
