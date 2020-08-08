import React, { useEffect, useState, useContext } from "react";
import { Link } from "gatsby";
import { compose } from "recompose";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { useSearchParam } from "react-use";
import Countdown from "react-countdown";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import SubmissionsCard from "../components/Write/SubmissionsCard";
import CardContainer from "../components/Containers/CardContainer";
import CleanButton from "../components/Buttons/CleanButton";
import Layout from "../components/layout";
import Loader from "../components/Loader";
import {
  withAuthorization,
  withEmailVerification,
} from "../components/Session";
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
    attempts: [],
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

  const [startedWriting, setStart] = useLocalStorage(
    `${id}${authUser.uid}_started`,
    false,
  );

  const loadMoreQs = () => {
    axios
      .get(
        `https://essayerbackend.akashj.com/questions/${id}?userId=${authUser.uid}`,
      )
      .then(r => {
        console.log(r.data);
        setTopic(r.data);
        setLoading(false);
      });
  };

  const onSubmit = e => {
    e.preventDefault();
    const reqSubmit = {
      essayId: id,
      userId: authUser.uid,
      submission,
    };
    console.log(reqSubmit);
    axios
      .post(
        `https://essayerbackend.akashj.com//submission/submit`,
        reqSubmit,
      )
      .then(() => {
        Swal.fire("", "Your Essay was Submitted", "success");
        loadMoreQs();
        reset();
      })
      .catch(console.error);
  };

  const reset = () => {
    setEssayText("");
    document.querySelector("#myTextArea").value = "";
    setTimer(1800000);
    setStart(false);
  };

  useEffect(() => {
    setLoading(true);
    loadMoreQs();
  }, []);

  return (
    <>
      {!startedWriting && topic.attempts.length > 0 && (
        <>
          <b>
            Drop your submission link in the chat to get a free expert
            rating :)
          </b>
          <br />
          <br />
        </>
      )}
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
          <div>New Submission</div>
          <div
            style={{ fontWeight: 600, fontSize: 16 }}
            className="valign-wrapper"
          >
            {!loading && startedWriting && (
              <Countdown
                onTick={e => setTimer(e.total)}
                renderer={Renderer}
                date={Date.now() + timer}
                // onComplete={onSubmit}
              />
            )}
          </div>
        </div>

        {!loading && (
          <div style={{ padding: "1em" }}>
            <div>
              {topic.topic.split("\n").map((ps, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "0.5em",
                    fontStyle: "italic",
                    color: "rgb(74, 171, 68)",
                    textAlign: "justify",
                  }}
                >
                  {ps}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "0.7em",
                marginBottom: "1em",
                padding: "0 1em",
                textAlign: "justify",
              }}
            >
              {topic.question}
            </div>

            {!startedWriting && (
              <>
                <div
                  style={{
                    marginTop: "0.7em",
                    marginBottom: "0.7em",
                    color: "rgb(113, 111, 111)",
                  }}
                >
                  Instructions:
                </div>
                <ol style={{ color: "rgb(113, 111, 111)" }}>
                  <li>
                    Read the Essay Topic and Question given above
                    carefully.
                  </li>
                  <li>
                    Formulate an opinion and think carefully about
                    what you should write.
                  </li>
                  <li>
                    Once you click on "Start Writing" below, a 30
                    minute timer will start, and you will be allowed
                    to write your response.
                  </li>
                  <li>
                    To submit your response, click on "Stop & Submit".
                    To exit without submitting a response, click on
                    "Reset".
                  </li>
                </ol>
                <div style={{ textAlign: "center", width: "100%" }}>
                  <CleanButton
                    onClick={() => setStart(true)}
                    style={{
                      color: "rgb(74, 171, 68)",
                      border: "1px solid rgb(74, 171, 68)",
                      marginTop: "1.3em",
                      marginBottom: "1em",
                    }}
                  >
                    Start Writing
                  </CleanButton>
                </div>
              </>
            )}

            {startedWriting && (
              <>
                <form onSubmit={onSubmit}>
                  <TextareaAutosize
                    minRows={20}
                    style={{
                      width: "100%",
                      padding: "0.3em",
                      border: "0.1px solid black",
                    }}
                    defaultValue={submission}
                    onChange={e => setEssayText(e.target.value)}
                    id="myTextArea"
                    required
                  />
                  <div style={{ marginTop: "1em" }}>
                    <div style={{ textAlign: "right" }}>
                      <CleanButton
                        style={{
                          color: "white",
                          border: "solid 1px red",
                          background: "red",
                          marginRight: "0.7em",
                          fontWeight: 500,
                        }}
                        onClick={reset}
                      >
                        RESET
                      </CleanButton>
                      <CleanButton
                        style={{
                          color: "rgb(74, 171, 68)",
                          border: "solid 1px rgb(74, 171, 68)",
                          fontWeight: 500,
                        }}
                        type="submit"
                      >
                        STOP & SUBMIT
                      </CleanButton>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {loading && (
          <div style={{ padding: "1em" }}>
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          </div>
        )}
      </CardContainer>
      {!startedWriting && !loading && (
        <SubmissionsCard id={id} attempts={topic.attempts} />
      )}
    </>
  );
};

const condition = authUser => !!authUser;

const seo = {
  title: "Writing An Essay",
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
