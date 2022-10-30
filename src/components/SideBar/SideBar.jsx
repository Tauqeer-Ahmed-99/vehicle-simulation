import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import "./sidebar.css";

const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const routesWithoutParams = routes.filter(
    (route) => !route.path.includes(":")
  );

  return (
    <div className="sidebar-screen">
      <div className="sidebar">
        {routesWithoutParams.map((route) => (
          <div
            key={route.path}
            className={`sidebar-tile${
              pathname.includes(route.path) ? " active" : ""
            }`}
            onClick={() => navigate(route.path)}
          >
            {route.label}
          </div>
        ))}
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default SideBar;
