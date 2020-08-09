import React from "react";

export default function FileUploader() {
  return (
    <div
      style={{
        width: "90%",
        height: "calc(30vw * 2)",
        boxShadow: "2px 5px 4px rgba(0, 0, 0, 0.25)",
        textAlign: "center",
        marginTop: "1.5em",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "50%",
      }}
    >
      <img
        style={{ height: 40, width: 40 }}
        src="/AddReport/plus.svg"
      />
    </div>
  );
}
