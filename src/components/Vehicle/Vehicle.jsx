import React from "react";
import "./vehicle.css";

const Vehicle = ({ cssStyle, serialNumber }) => {
  return (
    <div style={cssStyle} className="vehicle">
      {serialNumber}
    </div>
  );
};

export default Vehicle;
