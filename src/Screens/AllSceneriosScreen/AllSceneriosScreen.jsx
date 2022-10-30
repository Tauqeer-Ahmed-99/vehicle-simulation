import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/Dialog/Dialog";
import NoScenerioAvailable from "../../components/NoScenerioAvailable/NoScenerioAvailable";
import TableItem from "../../components/TableItem/TableItem";
import SceneriosContext from "../../context/SceneriosContext/SceneriosContext";
import "./all-scenerios-screen.css";
import CloseIcon from "../../assets/icons/close.svg";

const AllSceneriosScreen = () => {
  const [open, setOpen] = useState(false);
  const [deleteAllConfirmationOpen, setDeleteAllConfirmationOpen] =
    useState(false);
  const [scenerioId, setScenerioId] = useState(null);
  const navigate = useNavigate();

  const sceneriosContext = useContext(SceneriosContext);

  const openConfirmationBox = () => {
    setOpen(true);
  };

  const closeConfirmationBox = () => {
    setOpen(false);
  };

  const handleDeleteScenerioClick = (scenerioId) => {
    openConfirmationBox();
    setScenerioId(scenerioId);
  };

  const handleConfirmClick = () => {
    sceneriosContext.deleteScenerio(scenerioId);
    closeConfirmationBox();
  };

  const handleConfirmDeleteAllClick = () => {
    sceneriosContext.deleteAllScenerios();
  };

  return (
    <div className="all-scenerios-screen">
      {sceneriosContext.scenerios.length ? (
        <>
          <header>
            <h2>All Scenerios</h2>
            <div className="actions">
              <button onClick={() => navigate("/add-scenerio")}>
                New Scenerio
              </button>
              <button onClick={() => navigate("/add-vehicle")}>
                Add Vehicle
              </button>
              <button onClick={() => setDeleteAllConfirmationOpen(true)}>
                Delete All
              </button>
              <Dialog
                open={deleteAllConfirmationOpen}
                onClose={() => setDeleteAllConfirmationOpen(false)}
              >
                <div className="dialog-header">
                  <span>Delete All Scenerios?</span>
                  <img
                    src={CloseIcon}
                    alt="Close"
                    onClick={() => setDeleteAllConfirmationOpen(false)}
                  />
                </div>
                <div className="dialog-content">
                  Do you really want to delete all Scenerios?
                </div>
                <div className="dialog-actions">
                  <button onClick={() => setDeleteAllConfirmationOpen(false)}>
                    Cancel
                  </button>
                  <button onClick={handleConfirmDeleteAllClick}>Yes</button>
                </div>
              </Dialog>
            </div>
          </header>
          <main className="scenerios-table">
            <div className="table-header">
              <span>Scenerio Id</span>
              <span>Scenerio Name</span>
              <span>Scenerio Time</span>
              <span>Number of vehicles</span>
              <span>Add vehicles</span>
              <span>Edit</span>
              <span>Delete</span>
            </div>
            <Dialog open={open} onClose={closeConfirmationBox}>
              <div className="dialog-header">
                <span>Delete Scenerio?</span>
                <img
                  src={CloseIcon}
                  alt="Close"
                  onClick={closeConfirmationBox}
                />
              </div>
              <div className="dialog-content">
                Do you really want to delete this Scenerio?
              </div>
              <div className="dialog-actions">
                <button onClick={closeConfirmationBox}>Cancel</button>
                <button onClick={handleConfirmClick}>Yes</button>
              </div>
            </Dialog>
            {sceneriosContext.scenerios?.map((scenerio, idx) => (
              <TableItem
                key={scenerio.id}
                scenerio={scenerio}
                serialNumber={idx + 1}
                handleDeleteScenerioClick={handleDeleteScenerioClick}
              />
            ))}
          </main>
        </>
      ) : (
        <NoScenerioAvailable />
      )}
    </div>
  );
};

export default AllSceneriosScreen;
