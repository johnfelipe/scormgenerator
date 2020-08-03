import React from 'react';
import './CourseNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAngleRight, faAngleLeft, faShareSquare, faBook } from '@fortawesome/free-solid-svg-icons';

function CourseNav(props) {

    return (
        <div id="course-navigation" className="course-navigation-container h-100 w-100">
            <div class="container mt-2">
                <div class="row">
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <FontAwesomeIcon icon={faBars}/>&nbsp;Menu
                                </button>
                            </div>
                            <p class="card-text text-center mt-3 text-white">Select to view course slides.</p> 
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <FontAwesomeIcon icon={faAngleLeft}/>&nbsp;Previous
                                </button>
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0 mt-2">
                                    <FontAwesomeIcon icon={faAngleRight}/>&nbsp;Next
                                </button>
                            </div>
                            <p class="card-text text-center mt-3 text-white">Use these buttons to navigate through the slides.</p> 
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <FontAwesomeIcon icon={faShareSquare}/>&nbsp;Resources
                                </button>
                            </div>
                            <p class="card-text text-center mt-3 text-white">Select to access course source materials.</p> 
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block p-3 h-100" style={{ background: props.backgroundColor}}>
                            <div className="w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <FontAwesomeIcon icon={faBook}/>&nbsp;Glossary
                                </button>
                            </div>
                            <p class="card-text text-center mt-3 text-white">Use the glossary for definitions, acronyms, and abbreviations.</p> 
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );    
}

export default CourseNav;
