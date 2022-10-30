import React from "react";

import "./dialog.css";

const Dialog = ({ open, onClose, children, style }) => {
  const handleBackdropClick = () => {
    onClose?.();
  };
  return (
    <>
      {open && (
        <>
          <div className="backdrop" onClick={handleBackdropClick}></div>
          <div style={style ?? {}} id="dialog" className="dialog-box">
            {children}
            {/* <div className="dialog-header">
              <span>Heading</span>
              <img src={CloseIcon} alt="Close" />
            </div>
            <div className="dialog-content">Content</div>
            <div className="dialog-actions">
              <button>Cancel</button>
              <button>Yes</button>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default Dialog;
