import React from "react";
import { navigate } from "gatsby";

import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.5em;
`;

const Title = styled.div`
  font-size: 24px;
  line-height: 28px;
  font-weight: 500;

  color: #000000;
`;

const ViewAll = styled.div`
  margin-left: auto;
  font-size: 18px;
  line-height: 21px;
  text-decoration: underline;

  color: #3354ff;
`;

const PreviewCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1em;

  min-height: 15vh;
  margin: 0.5em 0;
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

const ReportCards = ({ category, info, url }) => {
  return (
    <>
      <Wrapper>
        <div className="valign-wrapper">
          <Title>{category}</Title>
          <ViewAll
            onClick={() => {
              navigate(url);
            }}
          >
            View All
          </ViewAll>
        </div>
        <PreviewCard>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            {info.title}
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
        </PreviewCard>
      </Wrapper>
    </>
  );
};

export default ReportCards;
