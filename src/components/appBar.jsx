import React from "react";
import { navigate } from "gatsby";

import { Icon } from "semantic-ui-react";

const appBar = ({ url, title, show, background }) => {
  console.log(process.env.SECRET)
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        background: background ? background : "rgb(234 241 255)",
      }}
    >
      <div
        className="valign-wrapper"
        style={{
          fontSize: 24,
          margin: show ? "0" : "0.5em 0 0 0",
          background: show ? "#294086" : "#ffffff",
          padding: show ? "15px 0px 15px 20px" : "10px 0px 0px 15px",
          borderRadius: show ? "0 0 25px 25px" : "0 0 0 0",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            padding: "0.4em 0.5em",
            background: "white",
            color: "#294086",
            height: 40,
            width: 40,
          }}
        >
          <Icon
            onClick={() => history.back()}
            fitted
            name="arrow left"
            size="small"
          />
        </div>
        <span style={{ marginLeft: "1em", color: "white" }}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default appBar;
