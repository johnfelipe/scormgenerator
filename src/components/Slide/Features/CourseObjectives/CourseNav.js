import React from 'react';
import './CourseNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function CourseNav() {

    return (
        <div id="course-navigation" className="course-navigation-container h-100 w-100">
            <div class="container mt-2">
                <div class="row">
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block p-3">
                            <div className="h-100 w-100 text-center">
                                <button type="button" className="menu-btn btn btn-light border border-secondary rounded-0">
                                    <FontAwesomeIcon icon={faBars}/>&nbsp;Menu
                                </button>
                            </div>
                            <p class="card-text text-center mt-3">Select to view course slide.</p> 
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block">
                            <img src="https://static.pexels.com/photos/7357/startup-photos.jpg" alt="Photo of sunset"/>
                            <h5 class="card-title  mt-3 mb-3">ProVyuh</h5>
                            <p class="card-text">This is a company that builds websites, web .</p> 
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block">
                            <img src="https://static.pexels.com/photos/262550/pexels-photo-262550.jpeg" alt="Photo of sunset"/>
                            <h5 class="card-title  mt-3 mb-3">ProVyuh</h5>
                            <p class="card-text">This is a company that builds websites, web apps and e-commerce solutions.</p> 
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 item">
                        <div class="border border-secondary rounded item-card card-block">
                            <img src="https://static.pexels.com/photos/326424/pexels-photo-326424.jpeg" alt="Photo of sunset"/>
                            <h5 class="card-title  mt-3 mb-3">ProVyuh</h5>
                            <p class="card-text">This is a company that builds websites, web apps and e-commerce solutions.</p> 
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );    
}

export default CourseNav;
