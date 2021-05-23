import React from "react";
import "./LaunchDetail.css";

function LaunchDetail(props) {
  const { name, id, rocket, rocketName, details } = props;
  return (
    <li className="launch" key={id}>
      <div className="launchMain">
        <h2>{name}</h2>
        <div>Rocket ID: {rocket}</div>
        <div>Rocket Name: {rocketName}</div>
      </div>
      <div className="launchDetailsPopup">
        {details || "No details to display"}
      </div>
    </li>
  );
}

export default LaunchDetail;
