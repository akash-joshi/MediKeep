import React from "react";
import { navigate } from "gatsby";

import { Icon } from "semantic-ui-react";

const appBar = ({ url, title }) => {
  return (
    <div
      className="valign-wrapper"
      style={{
        fontSize: 20,
        margin: "0.5em 0",
        marginTop: "0em"
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
