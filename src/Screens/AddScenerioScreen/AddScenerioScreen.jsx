import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SceneriosContext from "../../context/SceneriosContext/SceneriosContext";
import useForm from "../../hooks/useForm";
import "./add-scenerio-screen.css";

const AddScenerioScreen = () => {
  const sceneriosContext = useContext(SceneriosContext);
  const { scenerioId } = useParams();
  const scenerio = sceneriosContext.scenerios.find(
    (scenerio) => scenerio.id === +scenerioId
  );

  const [
    formValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateFormFunction,
    resetForm,
    ,
    resetErrors,
  ] = useForm({
    scenerioName: {
      value: scenerio ? scenerio.name : "",
      validate: (scenerioName) => !scenerioName,
    },
    scenerioTime: {
      value: scenerio ? scenerio.time : "",
      validate: (scenerioTime) => !scenerioTime,
    },
  });

  const navigate = useNavigate();

  const handleAddScenerioClick = () => {
    const isFormValid = validateFormFunction();
    if (isFormValid) {
      if (scenerio) {
        const updatedScenerio = {
          id: scenerio.id,
          name: formValues.scenerioName,
          time: +formValues.scenerioTime,
          vehicles: scenerio.vehicles,
        };
        sceneriosContext.updateScenerio(+scenerioId, updatedScenerio);
      } else {
        const newScenerio = {
          id: Math.random(),
          name: formValues.scenerioName,
          time: +formValues.scenerioTime,
          vehicles: [],
        };
        sceneriosContext.addScenerio(newScenerio);
      }
      navigate("/all-scenerios");
    }
  };

  return (
    <div className="add-scenerio-screen">
      <div className="container">
        <h2>{scenerio ? "Update Scenerio" : "Add Scenerio"}</h2>
        <div className="add-scenerio-form">
          <div>
            <label>Scenerio Name</label>
            <input
              name="scenerioName"
              placeholder="Test scenerio"
              value={formValues.scenerioName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {fieldErrors.scenerioName && (
              <span className="error-msg">Scenerio name is required.</span>
            )}
          </div>
          <div>
            <label>Scenerio Time (Second)</label>
            <input
              name="scenerioTime"
              placeholder="10"
              value={formValues.scenerioTime}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              type="number"
            />
            {fieldErrors.scenerioTime && (
              <span className="error-msg">Scenerio time is required.</span>
            )}
          </div>
        </div>
        <div className="actions">
          <button onClick={handleAddScenerioClick}>
            {scenerio ? "Save" : "Add"}
          </button>
          <button
            onClick={() => {
              resetForm();
              resetErrors();
            }}
          >
            Reset
          </button>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default AddScenerioScreen;
