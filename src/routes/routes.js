import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import AddScenerioScreen from "../Screens/AddScenerioScreen/AddScenerioScreen";
import AllSceneriosScreen from "../Screens/AllSceneriosScreen/AllSceneriosScreen";
import AddVehicleScreen from "../Screens/AddVehicleScreen/AddVehicleScreen";

export const routes = [
  { label: "Home", path: "/home", element: HomeScreen },
  { label: "Home", path: "/home/:scenerioId", element: HomeScreen },
  {
    label: "Add Scenerio",
    path: "/add-scenerio",
    element: AddScenerioScreen,
  },
  {
    label: "Add Scenerio",
    path: "/add-scenerio/:scenerioId",
    element: AddScenerioScreen,
  },
  {
    label: "All Scenerios",
    path: "/all-scenerios",
    element: AllSceneriosScreen,
  },
  {
    label: "Add Vehicle",
    path: "/add-vehicle",
    element: AddVehicleScreen,
  },
  {
    label: "Add Vehicle",
    path: "/add-vehicle/:scenerioId",
    element: AddVehicleScreen,
  },
  {
    label: "Add Vehicle",
    path: "/add-vehicle/:scenerioId/:vehicleId",
    element: AddVehicleScreen,
  },
];
