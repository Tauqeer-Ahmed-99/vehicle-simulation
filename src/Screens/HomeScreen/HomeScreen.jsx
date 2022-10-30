import React, { useState } from "react";
import "./home-screen.css";

import VehicleTableItem from "../../components/VehiclesTableItem/VehiclesTableItem";
import Scenerio from "../../components/Scenerio/Scenerio";
import { useContext } from "react";
import SceneriosContext from "../../context/SceneriosContext/SceneriosContext";
import NoScenerioAvailable from "../../components/NoScenerioAvailable/NoScenerioAvailable";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../components/Dialog/Dialog";
import CloseIcon from "../../assets/icons/close.svg";

const HomeScreen = () => {
  const sceneriosContext = useContext(SceneriosContext);
  const { scenerioId: scenerioIdFromParams } = useParams();
  const scenerioFromParams = sceneriosContext.scenerios.find(
    (scenerio) => scenerio.id === +scenerioIdFromParams
  );

  const [isActive, setIsActive] = useState(false);
  const [scenerioId, setScenerioId] = useState(scenerioIdFromParams ?? "none");
  const [scenerio, setScenerio] = useState(scenerioFromParams ?? null);
  const [open, setOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState(null);

  const navigate = useNavigate();

  const startSimulation = () => {
    setIsActive(true);

    setTimeout(() => setIsActive(false), +scenerio.time * 1000);
  };

  const stopSimulation = () => {
    setIsActive(false);
  };

  const handleScenerioIdChange = (event) => {
    setScenerioId(event.target.value);
    const scenerio = sceneriosContext.scenerios.find(
      (scenerio) => scenerio.id === +event.target.value
    );
    setScenerio(scenerio);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleDeleteClick = (scenerioId, vehicleId) => {
    setDeleteConfig({ scenerioId, vehicleId });
    setOpen(true);
  };

  const handleConfirmClick = () => {
    sceneriosContext.deleteVehicle(
      deleteConfig.scenerioId,
      deleteConfig.vehicleId
    );
    setOpen(false);
  };

  return (
    <div className="homescreen">
      <main className="home-content">
        <div className="scenerio-selection">
          <label>Scenerio</label>
          <select value={scenerioId} onChange={handleScenerioIdChange}>
            <option value="none">Select Scenerio</option>
            {sceneriosContext.scenerios.map((scenerio) => (
              <option key={scenerio.id} value={scenerio.id}>
                {scenerio.name}
              </option>
            ))}
          </select>
        </div>
        {sceneriosContext.scenerios.length ? (
          <>
            {scenerio?.vehicles.length ? (
              <>
                <div className="scenerios-table">
                  <div className="table-header">
                    <span>Vehicle Id</span>
                    <span>Vehicle Name</span>
                    <span>Position X</span>
                    <span>Position Y</span>
                    <span>Speed</span>
                    <span>Direction</span>
                    <span>Edit</span>
                    <span>Delete</span>
                  </div>
                  <Dialog open={open} onClose={handleCloseClick}>
                    <div className="dialog-header">
                      <span>Delete Vehicle?</span>
                      <img
                        src={CloseIcon}
                        alt="Close"
                        onClick={handleCloseClick}
                      />
                    </div>
                    <div className="dialog-content">
                      Do you really want to delete this vehicle?
                    </div>
                    <div className="dialog-actions">
                      <button onClick={handleCloseClick}>Cancel</button>
                      <button onClick={handleConfirmClick}>Yes</button>
                    </div>
                  </Dialog>
                  {scenerio?.vehicles?.map((vehicle, idx) => (
                    <VehicleTableItem
                      key={vehicle.id}
                      vehicle={vehicle}
                      serialNumber={idx + 1}
                      scenerioId={scenerioId}
                      handleDeleteClick={handleDeleteClick}
                    />
                  ))}
                </div>
                <div className="actions">
                  <button disabled={isActive} onClick={startSimulation}>
                    Start Simulation
                  </button>
                  <button onClick={stopSimulation}>Stop Simulation</button>
                </div>
              </>
            ) : scenerioId !== "none" ? (
              <div className="no-vehicles-added-msg">
                <div>No vehicles Available.</div>
                <button
                  onClick={() => navigate(`/add-vehicle/${scenerioId ?? ""}`)}
                >
                  Add Vehicle
                </button>
              </div>
            ) : (
              <div className="select-scenerio-msg">
                Please select a scenerio to simulate.
              </div>
            )}
            <div className="graph">
              <Scenerio isActive={isActive} vehicles={scenerio?.vehicles} />
            </div>
          </>
        ) : (
          <NoScenerioAvailable />
        )}
      </main>
    </div>
  );
};

export default HomeScreen;
