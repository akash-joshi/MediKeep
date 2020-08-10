import React from "react";

import moment from "moment";
import { navigate } from "gatsby";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1em;
  filter: drop-shadow(10px 15px 20px rgba(41, 64, 134, 0.4));
  min-height: 15vh;
  margin: 1.5em 0;
  position: relative;
  transition: box-shadow 0.3s ease-in-out;
  @media only screen and (max-width: 1000px) {
    padding: 0.5em 1em;
  }
`;

const MediaPreview = styled.div`
  margin: 0.2em 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ViewDetails = styled.div`
  margin-left: auto;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  text-decoration: underline;

  color: #3354ff;
`;

const PreviewCard = ({ info, show, category }) => {
  return (
    <Card
      onClick={() => {
        navigate(
          `/reports/view?id=${info.id}&title=${info.title}&category=${category}`,
        );
      }}
    >
      <div
        className="valign-wrapper"
        style={{
          marginTop: "0.5em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 600 }}>
          {info.title}
        </span>
        <span style={{ fontSize: "16px" }}>
          {moment(info.created_at).format("DD MMM YYYY")}
        </span>
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 400,
          marginTop: "0.75em",
          marginBottom: "1em",
        }}
      >
        {info.description}
      </div>
      <MediaPreview>
        {info.media
          .filter((el, index) => index < 2)
          .map((link, index) => (
            <img
              src={link}
              key={index}
              style={{
                width: "90%",
                height: "auto",
              }}
            />
          ))}
      </MediaPreview>
      <div style={{ textAlign: "right" }}></div>
    </Card>
  );
};

export default PreviewCard;
