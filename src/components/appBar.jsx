import React from "react";
import { navigate } from "gatsby";

import { Icon } from "semantic-ui-react";

const appBar = ({ url, title, show }) => {
  return (
    <div
      className="valign-wrapper"
      style={{
        fontSize: 20,
        margin: show ? "0" : "0.5em 0 0 0",
        background: show ? "#C4C4C4" : "#ffffff",
        padding: show ? "15px 0px 25px 20px" : "10px 0px 0px 15px",
        borderRadius: show ? "0 0 25px 25px" : "0 0 0 0",
        fontWeight: 600,
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          padding: "0.5em",
          background: "#333333",
          color: "#fff",
          height: 40,
          width: 40,
        }}
      >
        <Icon
          onClick={() => navigate(url)}
          fitted
          name="arrow left"
        />
      </div>
      <span style={{ marginLeft: "1em" }}>{title}</span>
    </div>
  );
};

export default appBar;
