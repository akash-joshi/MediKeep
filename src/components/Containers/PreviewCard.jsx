import React from "react";

import moment from "moment";
import { navigate } from "gatsby";
import styled from "styled-components";

const Card = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0px 8px 16px #f0f4f7;
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
  grid-template-columns: 1fr 1fr 1fr;
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
    <Card>
      <div
        className="valign-wrapper"
        style={{ fontSize: 18, fontWeight: 600 }}
      >
        {info.title}
        {show ? (
          <ViewDetails
            onClick={() => {
              navigate(
                `/reports/view?id=${info.id}&title=${info.title}&category=${category}`,
              );
            }}
          >
            View Details
          </ViewDetails>
        ) : (
          <></>
        )}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        {info.description}
      </div>
      <MediaPreview>
        {info.media.map((link, index) => (
          <img
            src={link}
            key={index}
            style={{
              width: 85,
              height: 65,
            }}
          />
        ))}
      </MediaPreview>
      <div style={{ textAlign: "right" }}>
        {moment(info.created_at).format("DD MMM YYYY, hh:mm a")}
      </div>
    </Card>
  );
};

export default PreviewCard;
