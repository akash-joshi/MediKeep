import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import axios from "axios";

import CardContainer from "../Containers/CardContainer";

export default function SubmissionsCard({ attempts, id }) {
  const [currentState, setCurrentState] = useState(0);
  const [globalSubmission, setGlobalSubmission] = useState([]);
  const [displayAttempts, setDisplayAttempts] = useState(attempts);

  useEffect(() => {
    setDisplayAttempts(
      currentState === 0 ? attempts : globalSubmission,
    );
  }, [currentState, attempts]);

  useEffect(() => {
    axios
      .get(
        `https://essayerbackend.akashj.com/questions/${id}/submissions`,
      )
      .then((r) => setGlobalSubmission(r.data));
  }, []);

  return (
    <CardContainer style={{ padding: 0 }}>
      <div
        style={{
          padding: "0.75em 1em",
          fontWeight: 600,
          fontSize: 16,
          display: "flex",
        }}
      >
        <div
          style={{
            color: currentState === 1 ? "#78909C" : "black",
            cursor: "pointer",
          }}
          onClick={() => {
            setCurrentState(0);
          }}
        >
          Your Submissions
        </div>
        <div
          style={{
            marginLeft: "0.3em",
            marginRight: "0.3em",
            color: "#78909C",
          }}
        >
          |
        </div>
        <div
          style={{
            color: currentState === 0 ? "#78909C" : "black",
            cursor: "pointer",
          }}
          onClick={() => {
            const globalSubmissionsExist =
              globalSubmission.length > 0;
            if (globalSubmissionsExist) {
              setCurrentState(1);
            }
          }}
        >
          All Submissions
        </div>
      </div>

      {displayAttempts.length === 0 ? (
        <div
          style={{
            padding: "1em",
            textAlign: "center",
            borderTop: "2px solid #EFF2F8",
          }}
        >
          You haven't made any submissions yet, <br /> click on{" "}
          <b>Start Writing</b> above to get started.
        </div>
      ) : (
        displayAttempts.reverse().map((attempt, index) => (
          <div
            style={{
              padding: "1em",
              borderTop: "2px solid #EFF2F8",
            }}
          >
            <Link
              style={{ color: "#6495ED", marginRight: "0.7em" }}
              to={`/write/submission?id=${attempt.submissionId}`}
            >
              Submission {index + 1}
            </Link>
          </div>
        ))
      )}
    </CardContainer>
  );
}
