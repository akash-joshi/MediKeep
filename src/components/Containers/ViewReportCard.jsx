import React from "react";

import moment from "moment";

import { navigate } from "gatsby";
import styled from "styled-components";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import CardContainer from "./CardContainer";

const MediaPreview = styled.div`
  margin: 0.5em 0;
  display: flex;
  overflow: auto;
  column-gap: 2em;
  // ::-webkit-scrollbar {
  //   display: none;
  // }
`;

const ViewDetails = styled.div`
  margin-left: auto;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  text-decoration: underline;

  color: #3354ff;
`;

const Text = styled.div`
  padding: 0.5em 1em;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  border-bottom: 2px solid rgb(239, 242, 248);
`;

const SubText = styled.div`
  padding: 0.5em 1em;
  font-size: 16px;
`;

const ViewReportCard = ({ info }) => {
  return (
    <>
      <MediaPreview>
        {info.media.map((link, index) => (
          <div style={{ flexShrink: "0" }}>
            <Zoom>
              <img
                src={link}
                key={index}
                style={{ width: "auto", height: "250px" }}
              />
            </Zoom>
          </div>
        ))}
      </MediaPreview>
      <CardContainer style={{ marginTop: "1em", padding: 0 }}>
        <Text>Description :</Text>
        <div style={{}}></div>
        <SubText>{info.description}</SubText>
      </CardContainer>
      <div style={{ textAlign: "center", fontWeight: "600" }}>
        {moment(info.created_at).format("DD-MM-YYYY")}
      </div>
    </>
  );
};

export default ViewReportCard;
