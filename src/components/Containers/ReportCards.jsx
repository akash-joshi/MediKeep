import React from "react";
import { navigate } from "gatsby";

import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.5em;
`;

const Title = styled.div`
  font-size: 24px;
  line-height: 28px;

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
  background: #ffffff;
  box-shadow: 0px 8px 16px #f0f4f7;
  border-radius: 8px;
  padding: 1em;
  min-height: 10vh;
  margin-bottom: 1.5em;
  position: relative;
  transition: box-shadow 0.3s ease-in-out;
  @media only screen and (max-width: 1000px) {
    padding: 0.5em 1em;
  }
`;

const ReportCards = ({ title, url, preview }) => {
  return (
    <>
      <Wrapper>
        <div className="valign-wrapper">
          <Title>{title}</Title>
          <ViewAll
            onClick={() => {
              navigate(url);
            }}
          >
            View All
          </ViewAll>
        </div>
        <PreviewCard />
      </Wrapper>
    </>
  );
};

export default ReportCards;
