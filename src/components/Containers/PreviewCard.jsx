import React from "react";

import { navigate } from "gatsby";
import styled from "styled-components";

const Card = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1em;

  min-height: 15vh;
  margin: 1em 0;
  position: relative;
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

const PreviewCard = ({ info, show }) => {
  return (
    <Card>
      <div
        className="valign-wrapper"
        style={{ fontSize: 16, fontWeight: 600 }}
      >
        {info.title}
        {show ? (
          <ViewDetails
            onClick={() => {
              navigate(`/reports/view?id=${info.id}`);
            }}
          >
            View Details
          </ViewDetails>
        ) : (
          false
        )}
      </div>
      <div
        style={{
          fontSize: 12,
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
      <div style={{ textAlign: "right" }}>{info.created_at}</div>
    </Card>
  );
};

export default PreviewCard;
