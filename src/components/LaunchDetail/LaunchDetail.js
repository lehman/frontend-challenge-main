import React from "react";
import "./LaunchDetail.css";

function LaunchDetail(props) {
  const { name, rocket, details } = props;
  return (
    <li className="launch">
      <div className="launchMain">
        <h2> {name} </h2>
        <div> {rocket} </div>
      </div>
      <div className="launchDetailsPopup">
        {details || "No details to display"}
      </div>
    </li>
  );
}

export default LaunchDetail;
