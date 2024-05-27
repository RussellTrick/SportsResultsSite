import React from "react";
import { PlayerStats } from "../types";

interface PlayerModalProps {
  row: PlayerStats | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ row, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  if (row !== null) {
    return (
      <div
        className="modal d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-content w-50">
          <div className="modal-header">
            <div className="d-flex flex-column flex-start align-start">
              <h5 className="modal-title">{row.firstname}</h5>
              <h6 className="text-left"> {row.surname}</h6>
            </div>
            <button type="button" className="close" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <p>{`Bib Number: ${row.bibnumber}`}</p>
            <p>{`Finish Time: ${row.finishtime}`}</p>
            <p>{`Time Difference: ${row.timeDifference}`}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PlayerModal;
