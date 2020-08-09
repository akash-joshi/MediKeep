import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";

import { Icon, Input } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import Layout from "../components/layout";
import Loader from "../components/Loader";

const Row = styled.div`
    margin-bottom: 1em;
`

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
        <span style={{ marginLeft: "1em" }}>Add a Report</span>
      </div>
      <div
        style={{
          verticalAlign: "middle",
          minHeight: "80vh",
          marginTop: "1em",
        }}
      >
        <Row>
          <b>Report Title</b>
          <Input style={{ width: "100%" }} />
        </Row>

        <Row>
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
        </Row>

        <Row>
            <b></b>
        </Row>
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
