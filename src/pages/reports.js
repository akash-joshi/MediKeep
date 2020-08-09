import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";

import { Icon } from "semantic-ui-react";

import { AuthUserContext } from "../components/Session";
import ClickableGradientCard from "../components/Containers/ClickableGradientCard";
import Layout from "../components/layout";
import Loader from "../components/Loader";

const HomePage = () => {
  return (
    <>
      <div
        style={{
          fontSize: 20,
          marginTop: "0.5em",
        }}
      >
        <Icon
          onClick={() => navigate("/")}
          fitted
          name="arrow left"
        />
        <span style={{ marginLeft: "1em" }}>Reports</span>
      </div>
      <div
        style={{
          display: "flex",
          verticalAlign: "middle",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            margin: "auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Icon
            onClick={() => navigate("/addreport")}
            fitted
            name="plus"
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
