import React, { useEffect, useState, useContext } from "react";
import { Link } from "gatsby";
import { compose } from "recompose";
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import CardContainer from "../components/Containers/CardContainer";
import ClickableGradientCard from "../components/Containers/ClickableGradientCard";
import CleanButton from "../components/Buttons/CleanButton";
import Layout from "../components/layout";
import Loader from "../components/Loader";
import TopicCard from "../components/Home/TopicCard";
import MockCard from "../components/Home/MockCard";
import { flattenDiagnosticMessageText } from "typescript";

const HomePage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          verticalAlign: "middle",
          minHeight: "80vh",
        }}
      >
        <div style={{ margin: "auto", width: "100%" }}>
          <ClickableGradientCard
            url={"#"}
            background="linear-gradient(203.55deg, #67B26F -4.43%, #4CA2CD 79.02%)"
            text="Measurements"
          />
          <ClickableGradientCard
            url={"#"}
            background="linear-gradient(203.55deg, #A770EF -4.43%, #CF8BF3 31.21%,
      #FDB99B 79.02%)"
            text="Reports"
          />
        </div>
      </div>
    </>
  );
};

const seo = {
  title: "Home",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
