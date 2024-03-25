import React from "react";

interface CompassProps {
  degrees: number;
}

const Compass: React.FC<CompassProps> = ({ degrees }) => {
  const pointerLength = 60;
  const pointerWidth = 10;

  const pointerStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) rotate(${degrees}deg)`, // Point towards the specified degrees
    width: "0",
    height: "0",
    borderLeft: `${pointerWidth / 2}px solid transparent`,
    borderRight: `${pointerWidth / 2}px solid transparent`,
    borderBottom: `${pointerLength}px solid red`,
    zIndex: 1,
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#888",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={{ position: "relative", width: "140px", height: "140px" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          border: "2px solid #333",
        }}
      />

      <div style={pointerStyle} />
      <div style={{ ...labelStyle, top: "15%", left: "50%" }}>N</div>
      <div style={{ ...labelStyle, top: "85%", left: "50%" }}>S</div>
      <div style={{ ...labelStyle, top: "50%", left: "15%" }}>W</div>
      <div style={{ ...labelStyle, top: "50%", left: "85%" }}>E</div>
    </div>
  );
};

export default Compass;
