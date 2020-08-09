import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";
import { compose } from "recompose";
import { Icon, Input } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import Layout from "../components/layout";
import FileUploader from "../components/AddReport/FileUploader";
import File from "../components/AddReport/File";

import {
  withAuthorization,
  withEmailVerification,
} from "../components/Session";

const Row = styled.div`
  margin-bottom: 1em;
`;

const HomePageBase = () => {
  const authUser = useContext(AuthUserContext);

  const [files, setFiles] = useLocalStorage("userfiles", []);

  console.log(files);

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
      <form
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
          <b>Add Reports (PDFs/Images)</b>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {files.map((fileURL, index) => (
              <File key={index} fileURL={fileURL} />
            ))}
            <FileUploader uid={authUser} setFiles={setFiles} />
            {/* <div
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
            </div> */}
          </div>
        </Row>
      </form>
    </>
  );
};

const seo = {
  title: "Home",
};

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
