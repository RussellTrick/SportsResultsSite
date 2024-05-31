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
        <div className="modal-content w-25 player-modal">
          <div className="modal-header justify-content-between p-4">
            <div className="d-flex flex-column flex-start text-start">
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
            <svg
              className="player-image border p-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#000000"
                d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
              />
            </svg>
            <section className="d-flex flex-column align-items-start">
              <p>
                Athlete ID: <b>{row.athleteid}</b>
              </p>
              <p>Team: {row.teamname}</p>
              <p>Country: {row.countryname}</p>
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
