import React from "react";
import { navigate } from "gatsby";

import styled from "styled-components";
import { indexOf } from "core-js/fn/array";

import PreviewCard from "./PreviewCard";

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
  color: #1a68b9;
`;

const ReportCards = ({ category, items, url }) => {
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
        {items.slice(0, 1).map((info, index) => (
          <PreviewCard key={index} info={info} show={false} />
        ))}
      </Wrapper>
    </>
  );
};

export default ReportCards;
