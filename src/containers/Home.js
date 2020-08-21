import React, { Component } from 'react';

//components
// import Generator from '../components/Generator/Generator';
// import Main from '../components/Generator/Main';
import CreateCourse from '../components/Generator/CreateCourse';

class Home extends Component {
  render() {  
    return (
        <div className="container-fluid">
            <CreateCourse />
            {/* <Main /> */}
            {/* <Generator /> */}
        </div>
    );
  }
}

export default Home;
