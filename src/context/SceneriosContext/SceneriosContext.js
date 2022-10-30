import { createContext } from "react";

const context = {
  scenerios: [],
  addScenerio: (scenerio) => {},
  deleteScenerio: (scenerioId) => {},
  updateScenerio: (scenerioId, updatedScenerio) => {},
  addVehicle: (scenerioId, vehicle) => {},
  deleteVehicle: (scenerioId, vehicleId) => {},
  updateVehicle: (scenerioId, vehicleId, updatedVehicle) => {},
  deleteAllScenerios: () => {},
};

const SceneriosContext = createContext(context);

export default SceneriosContext;
