import React from "react";

interface LimitModalProps {
  onClose: () => void;
}
const LimitModal: React.FC<LimitModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>You have reached your product limit!</h2>
        <p>Upgrade your plan to add more products.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LimitModal;
