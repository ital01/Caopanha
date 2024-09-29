import React from "react";

interface iModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<iModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;


  return (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}>
      <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      position: "relative",
      minWidth: "300px",
    }}>
        <button style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
    }} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};


export default Modal;
  


