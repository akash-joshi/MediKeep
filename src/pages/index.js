import React, { useEffect, useState, useContext } from "react";
import { Link } from "gatsby";
import { compose } from "recompose";
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import ClickableGradientCard from "../components/Containers/ClickableGradientCard";
import Layout from "../components/layout";
import Loader from "../components/Loader";

import {
  withAuthorization,
  withEmailVerification,
} from "../components/Session";

const HomePageBase = () => {
  return (
    <>
      <div
        style={{
          fontSize: 20,
          marginTop: "0.5em",
          textAlign: "right",
        }}
      >
        MediKeep
      </div>
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
            url={"/reports"}
            background="linear-gradient(203.55deg, #A770EF -4.43%, #CF8BF3 31.21%,
      #FDB99B 79.02%)"
            text="Reports"
          />
        </div>
      </div>
    </>
  );
};

const condition = authUser => !!authUser;

const seo = {
  title: "Creating a Topic",
};

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
