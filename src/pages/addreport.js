import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";

import { Icon, Input } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";

import Layout from "../components/layout";
import Loader from "../components/Loader";

const HomePage = () => {
  return (
    <>
      <div
        style={{
          fontSize: 20,
          marginTop: "0.5em",
        }}
      >
        <Icon
          onClick={() => navigate("/")}
          fitted
          name="arrow left"
        />
        <span style={{ marginLeft: "1em" }}>Reports</span>
      </div>
      <div
        style={{
          verticalAlign: "middle",
          minHeight: "80vh",
          marginTop: "1em",
        }}
      >
        <div style={{ marginBottom: "1em" }}>
          <b>Report Title</b>
          <Input style={{ width: "100%" }} />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <b>Report Description</b>
          <TextareaAutosize
            minRows={5}
            style={{
              width: "100%",
              padding: "0.3em",
              border: "0.1px solid rgba(0,0,0,.15)",
            }}
            id="myTextArea"
          />
        </div>
      </div>
    </>
  );
};

const seo = {
  title: "Home",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
