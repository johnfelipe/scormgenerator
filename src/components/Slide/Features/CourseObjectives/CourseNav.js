import React from 'react';
import './CourseNav.css';

function CourseNav(props) {

    return (
        <div id="course-navigation" className="course-navigation-container h-100 w-100">
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-3 col-sm-6 item">
                        <div className="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <i class="fas fa-bars"></i>&nbsp;Menu
                                </button>
                            </div>
                            <p className="card-text text-center mt-3 text-white">Select to view course slides.</p> 
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 item">
                        <div className="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <i class="fas fa-angle-left"></i>&nbsp;Previous
                                </button>
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0 mt-2">
                                    <i class="fas fa-angle-right"></i>&nbsp;Next
                                </button>
                            </div>
                            <p className="card-text text-center mt-3 text-white">Use these buttons to navigate through the slides.</p> 
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 item">
                        <div className="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <i class="fas fa-share-square"></i>&nbsp;Resources
                                </button>
                            </div>
                            <p className="card-text text-center mt-3 text-white">Select to access course source materials.</p> 
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 item">
                        <div className="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <i class="fas fa-book"></i>&nbsp;Glossary
                                </button>
                            </div>
                            <p className="card-text text-center mt-3 text-white">Use the glossary for definitions, acronyms, and abbreviations.</p> 
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );    
}

export default CourseNav;
