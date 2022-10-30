import React from "react";
import "./add-vehicle-screen.css";

import useForm from "../../hooks/useForm";
import { useContext } from "react";
import SceneriosContext from "../../context/SceneriosContext/SceneriosContext";
import NoScenerioAvailable from "../../components/NoScenerioAvailable/NoScenerioAvailable";
import { useNavigate, useParams } from "react-router-dom";

const AddVehicleScreen = () => {
  const scenerioContext = useContext(SceneriosContext);
  const { scenerioId, vehicleId } = useParams();

  const scenerio = scenerioContext.scenerios.find(
    (scenerio) => scenerio.id === +scenerioId
  );

  const vehicle = scenerio?.vehicles.find(
    (vehicle) => vehicle.id === +vehicleId
  );

  console.log(scenerioContext.scenerios);
  console.log(scenerio);
  console.log(vehicle);

  const initialValues = {
    scenerioList: {
      value: scenerioId ?? "none",
      validate: (value) => value === "none",
    },
    vehicleName: {
      value: vehicle ? vehicle.name : "",
      validate: (vehicleName) => !vehicleName,
    },
    vehicleSpeed: {
      value: vehicle ? vehicle.speed : "",
      validate: (speed) => !speed || +speed <= 0,
    },
    positionX: {
      value: vehicle ? vehicle.positionX : "",
      validate: (positionX) =>
        !positionX || +positionX <= 0 || +positionX > 100,
    },
    positionY: {
      value: vehicle ? vehicle.positionY : "",
      validate: (positionY) =>
        !positionY || +positionY <= 0 || +positionY > 100,
    },
    vehicleDirection: {
      value: vehicle ? vehicle.direction : "none",
      validate: (value) => value === "none",
    },
  };
  const [
    formValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateFormFunction,
    resetForm,
  ] = useForm(initialValues);

  const navigate = useNavigate();

  const handleAddVehicleClick = () => {
    const isFormValid = validateFormFunction();
    if (isFormValid) {
      if (!vehicle) {
        const id = Math.random();
        const vehicle = {
          id: id,
          name: formValues.vehicleName,
          positionX: formValues.positionX,
          positionY: formValues.positionY,
          speed: formValues.vehicleSpeed,
          direction: formValues.vehicleDirection,
          color: "#" + Math.floor(id * 16777215).toString(16),
        };
        scenerioContext.addVehicle(+formValues.scenerioList, vehicle);
        navigate("/all-scenerios");
      } else {
        const updatedVehicle = {
          id: vehicle.id,
          name: formValues.vehicleName,
          positionX: formValues.positionX,
          positionY: formValues.positionY,
          speed: formValues.vehicleSpeed,
          direction: formValues.vehicleDirection,
          color: vehicle.color,
        };
        scenerioContext.updateVehicle(
          +formValues.scenerioList,
          vehicle.id,
          updatedVehicle
        );
        navigate(`/home/${formValues.scenerioList}`);
      }
    }
  };

  return (
    <div className="add-vehicle-screen">
      {scenerioContext.scenerios.length ? (
        <div className="container">
          <h2>{vehicle ? "Update Vehicle" : "Add Vehicle"}</h2>
          <div className="add-vehicle-form">
            <div className="group1">
              <div>
                <label>Scenerio List</label>
                <select
                  name="scenerioList"
                  value={formValues.scenerioList}
                  placeholder="Select Scenerio"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                >
                  <option value="none">Select Scenerio</option>
                  {scenerioContext.scenerios.map((scenerio) => (
                    <option key={scenerio.id} value={scenerio.id}>
                      {scenerio.name}
                    </option>
                  ))}
                </select>
                {fieldErrors.scenerioList && (
                  <span className="error-msg">Select a valid scenerio.</span>
                )}
              </div>
              <div>
                <label>Vehicle Name</label>
                <input
                  name="vehicleName"
                  placeholder="Target abc"
                  type="text"
                  value={formValues.vehicleName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                {fieldErrors.vehicleName && (
                  <span className="error-msg">Enter a valid vehicle name.</span>
                )}
              </div>
              <div>
                <label>Speed</label>
                <input
                  name="vehicleSpeed"
                  placeholder="2"
                  type="number"
                  value={formValues.vehicleSpeed}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                {fieldErrors.vehicleSpeed && (
                  <span className="error-msg">
                    Enter a valid vehicle speed.
                  </span>
                )}
              </div>
            </div>
            <div className="group2">
              <div>
                <label>Position X</label>
                <input
                  name="positionX"
                  placeholder="0 - 100"
                  type="number"
                  value={formValues.positionX}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                {fieldErrors.positionX && (
                  <span className="error-msg">
                    Enter a valid X position(0 - 100).
                  </span>
                )}
              </div>
              <div>
                <label>Position Y</label>
                <input
                  name="positionY"
                  placeholder="0 - 100"
                  type="number"
                  value={formValues.positionY}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                {fieldErrors.positionY && (
                  <span className="error-msg">
                    Enter a valid Y position(0 - 100).
                  </span>
                )}
              </div>
              <div>
                <label>Direction</label>
                <select
                  name="vehicleDirection"
                  value={formValues.vehicleDirection}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                >
                  <option value="none">Select Direction</option>
                  <option value="towards">Towards</option>
                  <option value="backwards">Backwards</option>
                  <option value="upwards">Upwards</option>
                  <option value="downwards">Downwards</option>
                </select>
                {fieldErrors.vehicleDirection && (
                  <span className="error-msg">
                    Select a valid vehicle direction.
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="actions">
            <button onClick={handleAddVehicleClick}>
              {vehicle ? "Save" : "Add"}
            </button>
            <button onClick={() => resetForm()}>Reset</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      ) : (
        <NoScenerioAvailable />
      )}
    </div>
  );
};

export default AddVehicleScreen;
