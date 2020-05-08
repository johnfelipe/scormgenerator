import React, { Component } from 'react';

class AddGlossary extends Component {

    render() {
        return (
            <div id="add-glossary-container" className="float-right">
                <label htmlFor="glossaryBtn" className="mr-2">Add Glossary (Optional):</label>
                <button type="button" className="btn btn-outline-dark">Glossary</button>
            </div>
        )
    }
}

export default AddGlossary;
