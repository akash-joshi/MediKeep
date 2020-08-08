import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import axios from "axios";

import GreyFilter from "../Buttons/GreyFilter";

export default function TopicCard({ topic }) {
  const [globalSubmissions, setGlobalSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://essayerbackend.akashj.com/questions/${topic.id}/submissions`,
      )
      .then(r => {
        setGlobalSubmissions(r.data);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "1em",
        borderTop: "2px solid #EFF2F8",
      }}
    >
      <Link to={`/write/submissionmock?id=${topic.id}`}>
        <div>
          {topic.topic.split("\n").map((ps, index) => (
            <div
              key={index}
              style={{
                marginBottom: "0.5em",
                fontStyle: "italic",
                textAlign: "justify",
              }}
            >
              {ps}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "1em",
            paddingLeft: "1em",
            paddingRight: "1em",
            textAlign: "justify",
            color: "black",
          }}
        >
          {topic.question}
        </div>

        <br />

        <div style={{ display: "flex" }}>
          {topic.tags[0] === "gre" ? (
            <>
              <GreyFilter style={{ marginRight: "0.5em" }}>
                {topic.tags[0].toUpperCase()}
              </GreyFilter>

              <GreyFilter>
                {topic.tags[1].toUpperCase()} ESSAY
              </GreyFilter>
            </>
          ) : (
            <GreyFilter style={{ marginRight: "0.5em" }}>
              {topic.tags[0].toUpperCase()}
            </GreyFilter>
          )}
        </div>
        <br />
      </Link>
      <i>Author: {topic.writtenBy}</i>
    </div>
  );
}
