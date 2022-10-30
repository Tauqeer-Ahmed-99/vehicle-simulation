import React from "react";
import GridLines from "../GridLines/GridLines";
import Vehicle from "../Vehicle/Vehicle";

import "./scenerio.css";

const Scenerio = ({ isActive, vehicles }) => {
  return (
    <>
      <div className="scenerio-graph">
        <GridLines />
        {vehicles?.map((vehicle, idx) => {
          let distance;
          let cssStyle = {};

          if (vehicle.direction === "towards") {
            distance = 100 - vehicle.positionX;
            if (isActive) cssStyle.left = 100;
          } else if (vehicle.direction === "downwards") {
            distance = 100 - vehicle.positionY;
            if (isActive) cssStyle.top = 100;
          } else if (vehicle.direction === "backwards") {
            distance = vehicle.positionX;
            if (isActive) cssStyle.left = 0;
          } else {
            distance = vehicle.positionY;
            if (isActive) cssStyle.top = 0;
          }
          const speed = vehicle.speed;
          const time = distance / speed;
          const style = {
            top: `${
              isActive &&
              (vehicle.direction === "downwards" ||
                vehicle.direction === "upwards")
                ? cssStyle.top
                : vehicle.positionY
            }%`,
            left: `${
              isActive &&
              (vehicle.direction === "towards" ||
                vehicle.direction === "backwards")
                ? cssStyle.left
                : vehicle.positionX
            }%`,
            transitionDuration: `${isActive ? time : 0}s`,
            backgroundColor: vehicle.color,
          };
          return (
            <Vehicle
              key={vehicle.vehicleId}
              serialNumber={idx + 1}
              cssStyle={style}
            />
          );
        })}
      </div>
    </>
  );
};

export default Scenerio;
