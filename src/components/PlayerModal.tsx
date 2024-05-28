import React from "react";
import { PlayerStats } from "../types";
import closeMark from "../assets/xmark-solid.svg";

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
        <div className="modal-content w-25">
          <div className="modal-header justify-content-between">
            <div className="d-flex flex-column flex-start align-start">
              <h5 className="modal-title">{row.firstname}</h5>
              <h6 className="text-left"> {row.surname}</h6>
            </div>
            <div>
              <h4>{row.flag}</h4>
            </div>
            <button
              type="button"
              className="close p-0 d-flex align-items-center justify-content-center"
              onClick={onClose}
            >
              <img src={closeMark} className="close-mark"></img>
            </button>
          </div>
          <div className="modal-body d-flex gap-3">
            <img className="player-image"></img>
            <section className="d-flex flex-column align-items-start">
              <p>{`Bib Number: ${row.bibnumber}`}</p>
              <p>{`Finish Time: ${row.finishtime}`}</p>
              <p>{`Time Difference: ${row.timeDifference}`}</p>
            </section>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PlayerModal;
