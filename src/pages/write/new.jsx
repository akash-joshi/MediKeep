import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";
import { compose } from "recompose";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { useSearchParam } from "react-use";
import Countdown from "react-countdown";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../../components/Session";
import CardContainer from "../../components/Containers/CardContainer";
import CleanButton from "../../components/Buttons/CleanButton";
import Layout from "../../components/layout";
import Loader from "../../components/Loader";
import {
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";
import Swal from "sweetalert2";

const Renderer = ({ minutes, seconds }) => (
  <span>
    {minutes}:
    {seconds.toString().length === 1 ? `0${seconds}` : seconds}
  </span>
);

const HomePageBase = () => {
  const id = useSearchParam("id");

  const [topic, setTopic] = useState({
    topic: "",
  });
  const [loading, setLoading] = useState(false);
  const authUser = useContext(AuthUserContext);
  const [submission, setEssayText] = useLocalStorage(
    `${id}${authUser.uid}`,
    "",
  );
  const [timer, setTimer] = useLocalStorage(
    `${id}${authUser.uid}_timer`,
    1800000,
  );

  const loadMoreQs = () => {
    axios
      .get(
        `https://essayerbackend.akashj.com//questions/${id}?userId=${authUser.uid}`,
      )
      .then((r) => {
        setTopic(r.data);
        setLoading(false);
      });
  };

  const onSubmit = () => {
    const reqSubmit = {
      essayId: id,
      userId: authUser.uid,
      submission,
    };
    console.log(reqSubmit);
    axios
      .post(`https://essayerbackend.akashj.com/submission/submit`, reqSubmit)
      .then(() => {
        Swal.fire("", "Submitted", "success");
        reset();
      })
      .catch(console.error);
  };

  const reset = () => {
    setEssayText("");
    document.querySelector("#myTextArea").value = "";
    setTimer(1800000);
  };

  useEffect(() => {
    setLoading(true);
    loadMoreQs();
  }, []);

  return (
    <CardContainer style={{ padding: 0 }}>
      <div
        style={{
          padding: "0.5em 1em",
          fontWeight: 600,
          fontSize: 20,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
        }}
      >
        <div>New Attempt</div>
        <div
          style={{ fontWeight: 600, fontSize: 16 }}
          className="valign-wrapper"
        >
          {!loading && (
            <>
              <Countdown
                onTick={(e) => setTimer(e.total)}
                renderer={Renderer}
                date={Date.now() + timer}
                onComplete={onSubmit}
              />
            </>
          )}
        </div>
      </div>

      {!loading && (
        <div style={{ padding: "1em" }}>
          {topic.topic.split("\n").map((ps, index) => (
            <div
              style={{
                marginBottom: "0.35em",
                fontStyle: "italic",
                color: "rgb(74, 171, 68)",
              }}
            >
              {index == 0 && `" `}
              {ps}
              {index + 1 == topic.topic.split("\n").length && ` "`}
            </div>
          ))}
          <div style={{ marginTop: "0.7em" }}>{topic.question}</div>

          <br />

          <TextareaAutosize
            minRows={20}
            style={{
              width: "100%",
              padding: "0.3em",
              border: "0.1px solid black",
            }}
            defaultValue={submission}
            onChange={(e) => setEssayText(e.target.value)}
            id="myTextArea"
          />

          <div style={{ marginTop: "1em" }}>
            <div style={{ float: "right" }}>
              <CleanButton
                style={{
                  color: "white",
                  border: "solid 1px red",
                  background: "red",
                  marginRight: "0.7em",
                  fontWeight: 500,
                }}
                onClick={() => {
                  reset();
                }}
              >
                RESET
              </CleanButton>
              <CleanButton
                style={{
                  color: "green",
                  border: "solid 1px green",
                  fontWeight: 500,
                }}
                onClick={onSubmit}
              >
                SUBMIT
              </CleanButton>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "1em" }}>
        <div style={{ textAlign: "center" }}>
          {loading && <Loader />}
        </div>
      </div>
    </CardContainer>
  );
};

const condition = (authUser) => !!authUser;

const seo = {
  title: "Writing An Essay",
};

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout seo={seo}>
    <HomePage />
  </Layout>
);
