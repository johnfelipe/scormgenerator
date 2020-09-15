import React from "react";
import { NavLink } from "react-router-dom";

function SamplePage(props) {
  const { sample } = (props.location && props.location.state) || {};
  console.log('SAMPLE--SAMPLE')
  console.log(sample)
  return (
    <div>
      <NavLink to="/course" activeClassName="active">
        Go Back
      </NavLink>
      <div className="form-details">
        <div>
          <strong>Sample Data:</strong> {sample}
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
