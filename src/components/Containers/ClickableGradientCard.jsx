import React from "react";

const ClickableGradientCard = ({ text, url, background }) => {
  return (
    <div
      onClick={() => {
        location.href = url;
      }}
      style={{
        display: "flex",
        verticalAlign: "middle",
        background,
        borderRadius: 10,
        width: "90%",
        textAlign: "center",
        justifyContent: "center",
        height: 112,
        margin: "1em auto",
        color: "white",
        fontSize: 20,
      }}
    >
      <div style={{ width: "fit-content", margin: "auto" }}>
        {text}
      </div>
    </div>
  );
};

export default ClickableGradientCard;
