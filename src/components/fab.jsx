import React from "react";
import { navigate } from "gatsby";
import Icon from "../images/FAB/icon.svg";

const FAB = () => {
  return (
    <>
      <div
        onClick={() => navigate("/addreport")}
        style={{
          position: "absolute",
          textAlign: "center",
          borderRadius: "50%",
          padding: "15px",
          background: "#333333",
          bottom: "5%",
          right: "5%",
          width: 55,
          height: 55,
        }}
      >
        <img
          src={Icon}
          style={{ margin: 0, height: 25, width: 25 }}
        />
      </div>
    </>
  );
};

export default FAB;
