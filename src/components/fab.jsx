import React from "react";
import { navigate } from "gatsby";
import Icon from "../images/FAB/icon.svg";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const FAB = () => {
  return (
    <>
      <div
        onClick={() => navigate("/addreport")}
        style={{
          position: "fixed",
          textAlign: "center",
          borderRadius: "50%",
          padding: "15px",
          bottom: "5%",
          right: "10%",
          width: 55,
          height: 55,
        }}
      >
        <Fab
          style={{ background: "#333", color: "white" }}
          color="white"
          aria-label="add"
        >
          <AddIcon color="white" />
        </Fab>
      </div>
    </>
  );
};

export default FAB;
