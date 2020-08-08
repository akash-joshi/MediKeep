import React, { useEffect, useState, useContext } from "react";
import { compose } from "recompose";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { useLocalStorage, useSearchParam } from "react-use";

import CardContainer from "../../components/Containers/CardContainer";
import CleanButton from "../../components/Buttons/CleanButton";
import { AuthUserContext } from "../../components/Session";
import Layout from "../../components/layout";
import Loader from "../../components/Loader";
import {
  withAuthorization,
  withEmailVerification,
} from "../../components/Session";

const Label = styled.div`
  font-size: 12px;
  margin-bottom: 0.5em;
  font-weight: 700;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.7em;
  width: 100%;
`;

const HomePageBase = () => {
  const id = useSearchParam("id");

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

  const [topic, setTopic] = useState({
    id: 98,
    userId: "",
    topic:
      "Although innovations such as video, computers, and the Internet seem to offer schools improved methods for instructing students, these technologies all too often distract from real learning.",
    question:
      "Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
    tags: ["gre", "issue"],
    attempts: [
      {
        submissionId: 20,
        timestamp: "2020-05-24T10:55:19.163",
        reviews:
          '[{"rating": "6", "comment": "Excellent Essay. Follows PREP model and presents compelling arguement about the issue."}]',
      },
    ],
  });
  const [submission, setSubmission] = useState({
    id: 20,
    essayId: 98,
    userId: "JSwXyzKcz8ccF5l2eKV7iHloJPj1",
    submission:
      "The statement linking technology negatively with free thinking plays on recent human experience over the past century. Surely there has been no time in history where the lived lives of people have changed more dramatically. A quick reflection on a typical day reveals how technology has revolutionized the world. Most people commute to work in an automobile that runs on an internal combustion engine. During the workday, chances are high that the employee will interact with a computer that processes information on silicon bridges that are .09 microns wide. Upon leaving home, family members will be reached through wireless networks that utilize satellites orbiting the earth. Each of these common occurrences could have been inconceivable at the turn of the 19th century.\n\nThe statement attempts to bridge these dramatic changes to a reduction in the ability for humans to think for themselves. The assumption is that an increased reliance on technology negates the need for people to think creatively to solve previous quandaries. Looking back at the introduction, one could argue that without a car, computer, or mobile phone, the hypothetical worker would need to find alternate methods of transport, information processing and communication. Technology short circuits this thinking by making the problems obsolete.\n\nHowever, this reliance on technology does not necessarily preclude the creativity that marks the human species. The prior examples reveal that technology allows for convenience. The car, computer and phone all release additional time for people to live more efficiently. This efficiency does not preclude the need for humans to think for themselves. In fact, technology frees humanity to not only tackle new problems, but may itself create new issues that did not exist without technology. For example, the proliferation of automobiles has introduced a need for fuel conservation on a global scale. With increasing energy demands from emerging markets, global warming becomes a concern inconceivable to the horse-and-buggy generation. Likewise dependence on oil has created nation-states that are not dependent on taxation, allowing ruling parties to oppress minority groups such as women. Solutions to these complex problems require the unfettered imaginations of maverick scientists and politicians.\n\nIn contrast to the statement, we can even see how technology frees the human imagination. Consider how the digital revolution and the advent of the internet has allowed for an unprecedented exchange of ideas. WebMD, a popular internet portal for medical information, permits patients to self research symptoms for a more informed doctor visit. This exercise opens pathways of thinking that were previously closed off to the medical layman. With increased interdisciplinary interactions, inspiration can arrive from the most surprising corners. Jeffrey Sachs, one of the architects of the UN Millenium Development Goals, based his ideas on emergency care triage techniques. The unlikely marriage of economics and medicine has healed tense, hyperinflation environments from South America to Eastern Europe.\n\nThis last example provides the most hope in how technology actually provides hope to the future of humanity. By increasing our reliance on technology, impossible goals can now be achieved. Consider how the late 20th century witnessed the complete elimination of smallpox. This disease had ravaged the human race since prehistorical days, and yet with the technology of vaccines, free thinking humans dared to imagine a world free of smallpox. Using technology, battle plans were drawn out, and smallpox was systematically targeted and eradicated.\n\nTechnology will always mark the human experience, from the discovery of fire to the implementation of nanotechnology. Given the history of the human race, there will be no limit to the number of problems, both new and old, for us to tackle. There is no need to retreat to a Luddite attitude to new things, but rather embrace a hopeful posture to the possibilities that technology provides for new avenues of human imagination",
    timestamp: "2020-05-24T10:55:19.163",
    reviews:
      '[{"rating": "6", "comment": "Excellent Essay. Follows PREP model and presents compelling arguement about the issue."}]',
  });
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [addRating, setAddRating] = useState(false);
  const [comment, setComment] = useState("");

  const authUser = useContext(AuthUserContext);

  const addReview = e => {
    e.preventDefault();

    console.log(reviews);

    const nextReviews = [
      ...reviews,
      {
        comment,
        rating: document.querySelector("#rating").value,
      },
    ];

    const reviewIndex = mockData.findIndex(
      el => el.id === parseInt(id),
    );

    const nextMockData = [...mockData];
    nextMockData[reviewIndex].ratings = nextReviews;

    setMockData(nextMockData);

    setReviews(nextReviews)
    setAddRating(false)
  };

  useEffect(() => {
    const reviews = mockData.find(el => el.id === parseInt(id));
    if (reviews) {
      setReviews(reviews.ratings);
    }
  }, []);

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
          <div>View Submission</div>
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

            <br />

            <TextareaAutosize
              minRows={20}
              style={{
                width: "100%",
                padding: "0.3em",
                border: "0.1px solid black",
              }}
              value={submission.submission}
              id="myTextArea"
            />
          </div>
        )}

        <div style={{ padding: "1em" }}>
          <div style={{ textAlign: "center" }}>
            {loading && <Loader />}
          </div>
        </div>
      </CardContainer>

      {!loading && (
        <CardContainer style={{ padding: 0 }}>
          <div
            style={{
              padding: "0.75em 1em",
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>View Reviews</div>
          </div>

          {reviews.map((review, index) => (
            <div
              style={{
                padding: "1em",
                borderTop: "2px solid #EFF2F8",
              }}
              key={index}
            >
              <Label>Rating</Label>
              {review.rating}
              <br />
              <br />
              <Label>Comment</Label>
              {review.comment}
            </div>
          ))}

          <div
            style={{ padding: "1em", borderTop: "2px solid #EFF2F8" }}
          >
            {addRating ? (
              <form onSubmit={addReview}>
                <Input
                  placeholder="Rating (From 1 to 6)"
                  type="number"
                  step="0.5"
                  min="1"
                  max="6"
                  required
                  id="rating"
                />
                <br />
                <br />
                <TextareaAutosize
                  minRows={5}
                  style={{
                    width: "100%",
                    padding: "0.7em",
                    border: "1px solid black",
                    borderRadius: "4px",
                  }}
                  placeholder="Your Constructive Criticism"
                  onChange={e => setComment(e.target.value)}
                  required
                />
                <br />
                <br />
                <CleanButton
                  onClick={() => setAddRating(true)}
                  style={{
                    border: "1px solid rgb(74, 171, 68)",
                    color: "rgb(74, 171, 68)",
                  }}
                  type="submit"
                >
                  Submit Review
                </CleanButton>
              </form>
            ) : (
              <CleanButton
                onClick={() => setAddRating(true)}
                style={{
                  border: "1px solid rgb(74, 171, 68)",
                  color: "rgb(74, 171, 68)",
                }}
              >
                Add Review
              </CleanButton>
            )}
          </div>
        </CardContainer>
      )}
    </>
  );
};

const condition = authUser => !!authUser;

const seo = {
  title: "Viewing Submission",
};

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default function SubmissionMock() {
  return (
    <Layout seo={seo}>
      <HomePage />
    </Layout>
  );
}
