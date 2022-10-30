import React from "react";
import { useNavigate } from "react-router-dom";
import "./no-scenerio-available.css";

const NoScenerioAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="no-scenerios">
      <h3>No scenerios available to simulate.</h3>
      <button onClick={() => navigate("/add-scenerio")}>
        Create a Scenerio
      </button>
    </div>
  );
};

export default NoScenerioAvailable;
