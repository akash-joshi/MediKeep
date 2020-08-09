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
          fontSize: 24,
          fontWeight: 600,
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
            background="linear-gradient(to right, #ff00cc, #333399)"
            text="Measurements"
          />
          <ClickableGradientCard
            url={"/reports"}
            background="linear-gradient(to right, #000428, #004e92)"
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
    <div
      style={{ minHeight: "100vh", background: "rgb(234 241 255)" }}
    >
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
