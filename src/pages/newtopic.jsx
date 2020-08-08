import React, { useState, useContext } from "react";
import { compose } from "recompose";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import Swal from "sweetalert2";

import { AuthUserContext } from "../components/Session";
import CardContainer from "../components/Containers/CardContainer";
import CleanButton from "../components/Buttons/CleanButton";
import Layout from "../components/layout";
import {
  withAuthorization,
  withEmailVerification,
} from "../components/Session";

const InactiveFilter = styled.div`
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 16px;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  width: fit-content;
  padding: 0.5em 1em;
  cursor: pointer;
`;

const ActiveFilter = styled.div`
  background: #000000;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 16px;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  width: fit-content;
  padding: 0.5em 1em;
  cursor: pointer;
`;

const tagOptions = ["toefl"];

const HomePageBase = () => {
  const authUser = useContext(AuthUserContext);
  const [selectedTag, setSelectedTag] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    if (selectedTag === "") {
      return Swal.fire("No tag selected", "", "error");
    }

    const reqData = {
      question,
      topic,
      userId: authUser.uid,
      tags: [selectedTag],
    };

    axios
      .post(
        `https://essayerbackend.akashj.com/questions/addQuestion`,
        reqData,
      )
      .then(r => {
        Swal.fire("Submitted", "", "success");
        location.href = `/write?id=${r.data.id}`;
      });
  };

  return (
    <>
      <CardContainer style={{ padding: 0 }}>
        <div
          style={{
            padding: "0.75em 1em",
            fontWeight: 600,
            fontSize: 16,
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #EFF2F8",
          }}
        >
          <div>New Topic</div>
        </div>
        <form onSubmit={onSubmit} style={{ padding: "1em" }}>
          <b>Essay Topic</b>
          <TextareaAutosize
            onChange={e => setTopic(e.target.value)}
            minRows={3}
            style={{
              width: "100%",
              padding: "0.3em",
              border: "0.1px solid #EFF2F8",
              marginTop: "0.5em",
            }}
            placeholder={
              "Eg., In any field of endeavor, it is impossible to make a significant..."
            }
            id="myTextArea"
            required
          />
          <br />
          <br />
          <b>Question</b>
          <TextareaAutosize
            onChange={e => setQuestion(e.target.value)}
            minRows={3}
            style={{
              width: "100%",
              padding: "0.3em",
              border: "0.1px solid #EFF2F8",
              marginTop: "0.5em",
            }}
            placeholder={
              "Eg., Write a response in which you discuss..."
            }
            id="myTextArea"
            required
          />
          <br />
          <br />
          <b>Choose your Tags</b>
          <div
            style={{
              marginTop: "0.5em",
              display: "flex",
            }}
          >
            {tagOptions.map((tag, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTag(tag);
                }}
                style={{ marginRight: "0.5em" }}
              >
                {selectedTag === tag ? (
                  <ActiveFilter>{tag}</ActiveFilter>
                ) : (
                  <InactiveFilter>{tag}</InactiveFilter>
                )}
              </div>
            ))}
          </div>
          <br />
          <CleanButton
            type="submit"
            style={{
              border: "1px solid rgb(74, 171, 68)",
              color: "rgb(74, 171, 68)",
            }}
          >
            SUBMIT
          </CleanButton>
        </form>
      </CardContainer>
    </>
  );
};

const condition = authUser => !!authUser;

const seo = {
  title: "Creating a Topic",
};

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default function Write() {
  return (
    <Layout seo={seo}>
      <HomePage />
    </Layout>
  );
}
