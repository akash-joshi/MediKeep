import React, { useEffect, useState, useContext } from "react";
import { Link } from "gatsby";
import { compose } from "recompose";
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import CardContainer from "../components/Containers/CardContainer";
import CleanButton from "../components/Buttons/CleanButton";
import Layout from "../components/layout";
import Loader from "../components/Loader";
import TopicCard from "../components/Home/TopicCard";
import MockCard from "../components/Home/MockCard";
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

const HomePageBase = () => {
  const [topics, setTopics] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [newUser] = useState(true);
  const [type, setType] = useState("issue");
  const [isMock, setIsMock] = useState(false);

  console.log(mockData);

  const [mockData, setMockData] = useLocalStorage("mockData", [
    {
      id: 9,
      userId: "",
      writtenBy: "John Doe",
      topic:
        "Claim: In any field — business, politics, education, government — those in power should step down after five years.\nReason: The surest path to success for any enterprise is revitalization through new leadership.",
      question:
        "Write a response in which you discuss the extent to which you agree or disagree with the claim and the reason on which that claim is based.",
      tags: ["gre", "issue"],
      ratings: [],
    },
    {
      id: 10,
      userId: "",
      writtenBy: "Jane Doe",
      topic:
        "In any field of endeavor, it is impossible to make a significant contribution without first being strongly influenced by past achievements within that field.",
      question:
        "Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
      tags: ["gre", "issue"],
      ratings: [],
    },
  ]);

  const [currentState, setCurrentState] = useState(0);

  const authUser = useContext(AuthUserContext);

  const loadMoreQs = (topics, page) =>
    axios
      .get(
        `https://essayerbackend.akashj.com/questions/all?page=${page}&userId=${authUser.uid}&userData=false&type=${type}`,
      )
      .then(r => {
        setTopics([...topics, ...r.data.questionList]);
        if (page < r.data.pages) {
          setPage(page + 1);
          setMaxPages(r.data.pages);
        }
        setLoading(false);
        setLoadMore(false);
      });

  useEffect(() => {
    setTopics([]);
    setPage(0);
    setLoadMore(true);
    loadMoreQs([], 0);
  }, [type]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await axios
        .get(
          `https://essayerbackend.akashj.com/questions/all?userId=${authUser.uid}&userData=true&page=0&type=`,
        )
        .then(r => {
          if (r.data.questionList.length === 0) {
            setCurrentState(1);
          }
          setAttempts(r.data.questionList);
        });
      await loadMoreQs([], 0);
    };

    if (
      [
        "ATPBkl7PXFUul65ZHWeZJNFxWlk1",
        "JSwXyzKcz8ccF5l2eKV7iHloJPj1",
        "wTgfSulaxZc4Uz1LRtDiAr1eVAA2",
      ].some(el => el === authUser.uid)
    ) {
      setLoading(false);
      setIsMock(true);
    } else {
      init();
    }
  }, []);

  return (
    <>
      {!loading && newUser && !isMock && (
        <div style={{ marginBottom: "1em", fontSize: 23 }}>
          <b>
            You will see a list of topics below, Click on any topic to
            get started !
          </b>
        </div>
      )}

      <CardContainer style={{ padding: 0 }}>
        {!loading && (
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
                if (isMock || attempts.length > 0) {
                  setCurrentState(0);
                }
              }}
            >
              {isMock ? "Pending Submissions" : "Your Submissions"}
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
              onClick={() => setCurrentState(1)}
            >
              {isMock ? "Reviewed Submissions" : "Topics List"}
            </div>
          </div>
        )}

        {!loading && isMock ? (
          currentState === 0 ? (
            <>
              {mockData
                .filter(topic => topic.ratings.length === 0)
                .map((topic, index) => (
                  <MockCard topic={topic} key={index} />
                ))}
              {mockData.filter(topic => topic.ratings.length === 0)
                .length === 0 && <div style={{ padding: "1em", borderTop: "2px solid #EFF2F8", }}>
                No submissions to review.
              </div>}
            </>
          ) : (
            <>
              {mockData
                .filter(topic => topic.ratings.length !== 0)
                .map((topic, index) => (
                  <MockCard topic={topic} key={index} />
                ))}
              {mockData.filter(topic => topic.ratings.length !== 0)
                .length === 0 && (
                <div style={{ padding: "1em", borderTop: "2px solid #EFF2F8", }}>
                  No submissions reviewed yet.
                </div>
              )}
            </>
          )
        ) : currentState === 0 ? (
          attempts.map((topic, index) => (
            <TopicCard topic={topic} key={index} />
          ))
        ) : (
          <>
            {!loading && (
              <div
                style={{
                  padding: "1em",
                  display: "flex",
                  paddingTop: 0,
                }}
              >
                <div
                  onClick={() => {
                    setType("issue");
                  }}
                  style={{ marginRight: "0.5em" }}
                >
                  {type === "issue" ? (
                    <ActiveFilter>ISSUE</ActiveFilter>
                  ) : (
                    <InactiveFilter>ISSUE</InactiveFilter>
                  )}
                </div>
                <div
                  onClick={() => {
                    setType("arguement");
                  }}
                  style={{ marginRight: "0.5em" }}
                >
                  {type === "arguement" ? (
                    <ActiveFilter>ARGUEMENT</ActiveFilter>
                  ) : (
                    <InactiveFilter>ARGUEMENT</InactiveFilter>
                  )}
                </div>
                <div
                  onClick={() => {
                    setType("toefl");
                  }}
                >
                  {type === "toefl" ? (
                    <ActiveFilter>TOEFL</ActiveFilter>
                  ) : (
                    <InactiveFilter>TOEFL</InactiveFilter>
                  )}
                </div>
              </div>
            )}
            {topics.map((topic, index) => (
              <TopicCard topic={topic} key={index} />
            ))}
            {!loading && page < maxPages && (
              <div
                style={{
                  textAlign: "center",
                  padding: "1em",
                  borderTop: "2px solid #EFF2F8",
                }}
              >
                {loadMore ? (
                  <Loader />
                ) : (
                  <CleanButton
                    onClick={() => {
                      setLoadMore(true);
                      loadMoreQs(topics, page);
                    }}
                  >
                    Load More
                  </CleanButton>
                )}
              </div>
            )}
          </>
        )}

        {loading && (
          <div
            style={{
              padding: "0.5em",
              borderTop: "2px solid #EFF2F8",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Loader />
            </div>
          </div>
        )}
      </CardContainer>
    </>
  );
};

const condition = authUser => !!authUser;

const seo = {
  title: "Home",
};

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default function Home() {
  return (
    <Layout seo={seo}>
      <HomePage />
    </Layout>
  );
}
