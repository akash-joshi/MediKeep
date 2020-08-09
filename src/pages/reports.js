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
        className="valign-wrapper"
        style={{
          fontSize: 20,
          marginTop: "0.5em",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            padding: "0.5em",
            background: "#333333",
            color: "#fff",
          }}
        >
          <Icon
            onClick={() => navigate("/")}
            fitted
            name="arrow left"
          />
        </div>
        <span style={{ marginLeft: "1em" }}>Reports</span>
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
