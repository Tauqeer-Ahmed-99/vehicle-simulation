import React, { useState } from "react";
import { useEffect } from "react";
import SceneriosContext from "./SceneriosContext";

const SceneriosProvider = ({ children }) => {
  const [scenerios, setScenerios] = useState([]);

  useEffect(() => {
    if (scenerios.length)
      localStorage.setItem("scenerios", JSON.stringify(scenerios));
  }, [scenerios]);

  useEffect(() => {
    const sceneriosData = localStorage.getItem("scenerios");
    if (sceneriosData) {
      const parsedData = JSON.parse(sceneriosData);
      setScenerios(parsedData);
    }
  }, []);

  const addScenerio = (scenerio) => {
    setScenerios((prevScenerios) => [...prevScenerios, scenerio]);
  };

  const deleteScenerio = (scenerioId) => {
    setScenerios((prevScenerios) =>
      prevScenerios.filter((scenerio) => scenerio.id !== scenerioId)
    );
  };

  const updateScenerio = (scenerioId, updatedScenerio) => {
    const copiedScenerios = [...scenerios];
    copiedScenerios.splice(
      copiedScenerios.findIndex((scenerio) => scenerio.id === scenerioId),
      1,
      updatedScenerio
    );
    setScenerios(copiedScenerios);
  };

  const addVehicle = (scenerioId, vehicle) => {
    const selectedScenerioIndex = scenerios.findIndex(
      (scenerio) => scenerio.id === scenerioId
    );
    const copiedSelectedScenerio = {
      ...scenerios[selectedScenerioIndex],
      vehicles: [...scenerios[selectedScenerioIndex].vehicles],
    };
    copiedSelectedScenerio.vehicles.push(vehicle);
    const copiedScenerios = [...scenerios];
    copiedScenerios.splice(selectedScenerioIndex, 1, copiedSelectedScenerio);
    setScenerios(copiedScenerios);
  };

  const deleteVehicle = (scenerioId, vehicleId) => {
    const selectedScenerioIndex = scenerios.findIndex(
      (scenerio) => scenerio.id === scenerioId
    );
    const vehicles = scenerios[selectedScenerioIndex].vehicles;
    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle.id !== vehicleId
    );
    const copiedScenerios = [...scenerios];
    copiedScenerios[selectedScenerioIndex].vehicles = updatedVehicles;
    setScenerios(copiedScenerios);
  };

  const updateVehicle = (scenerioId, vehicleId, updatedVehicle) => {
    const selectedScenerioIndex = scenerios.findIndex(
      (scenerio) => scenerio.id === scenerioId
    );
    const vehicles = scenerios[selectedScenerioIndex].vehicles;
    const selectedVehicleIndex = vehicles.findIndex(
      (vehicle) => vehicle.id === vehicleId
    );
    vehicles.splice(selectedVehicleIndex, 1, updatedVehicle);
    const copiedScenerios = [...scenerios];
    copiedScenerios[selectedScenerioIndex].vehicles = vehicles;
    setScenerios(copiedScenerios);
  };

  const deleteAllScenerios = () => {
    setScenerios([]);
  };

  const context = {
    scenerios,
    addScenerio,
    deleteScenerio,
    updateScenerio,
    addVehicle,
    deleteVehicle,
    updateVehicle,
    deleteAllScenerios,
  };

  return (
    <SceneriosContext.Provider value={context}>
      {children}
    </SceneriosContext.Provider>
  );
};

export default SceneriosProvider;
