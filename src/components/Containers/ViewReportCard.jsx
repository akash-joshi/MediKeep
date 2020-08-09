import React from "react";

import moment from "moment";

import { navigate } from "gatsby";
import styled from "styled-components";

const MediaPreview = styled.div`
  margin: 0.5em 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2em;
`;

const ViewDetails = styled.div`
  margin-left: auto;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  text-decoration: underline;

  color: #3354ff;
`;

const ViewReportCard = ({ info }) => {
  return (
    <>
      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Description : {info.description}
        <br />
        Submitted on :{" "}
        {moment(info.created_at).format("DD MMM YYYY, hh:mm a")}
      </div>
      <MediaPreview>
        {info.media.map((link, index) => (
          <img src={link} key={index} />
        ))}
      </MediaPreview>
    </>
  );
};

export default ViewReportCard;
