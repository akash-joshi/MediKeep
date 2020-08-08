import React, { useEffect, useState, useContext } from "react";
import { compose } from "recompose";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { useSearchParam } from "react-use";
import styled from "styled-components";
import Swal from "sweetalert2";

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

  const [topic, setTopic] = useState({
    topic: "",
  });
  const [submission, setSubmission] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [addRating, setAddRating] = useState(false);
  const [comment, setComment] = useState("");

  const authUser = useContext(AuthUserContext);

  const addReview = (e) => {
    e.preventDefault();

    console.log(reviews);

    const nextReviews = [
      ...reviews,
      {
        comment,
        rating: document.querySelector("#rating").value,
      },
    ];

    const reviewRequest = {
      userId: authUser.uid,
      submissionId: id,
      comment: JSON.stringify(nextReviews),
    };

    axios
      .post(
        `https://essayerbackend.akashj.com/reviews/add`,
        reviewRequest,
      )
      .then((r) => {
        Swal.fire("", "Your Review has been Added !", "success");
        setReviews(nextReviews);
        setAddRating(false);
      });
  };

  const loadMoreQs = () => {
    axios
      .get(`https://essayerbackend.akashj.com/submission/${id}`)
      .then((r) => {
        console.log(r.data);
        setTopic(r.data.question);
        setSubmission(r.data.submission);
        if (r.data.submission.reviews === null) {
          setReviews([]);
        } else {
          console.log(JSON.parse(r.data.submission.reviews));
          setReviews(JSON.parse(r.data.submission.reviews));
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadMoreQs();
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
                  onChange={(e) => setComment(e.target.value)}
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

const condition = (authUser) => !!authUser;

const seo = {
  title: "Viewing Submission",
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
