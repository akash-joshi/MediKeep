import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";

import { Icon } from "semantic-ui-react";

import { AuthUserContext } from "../components/Session";
import ClickableGradientCard from "../components/Containers/ClickableGradientCard";
import Layout from "../components/layout";
import FAB from "../components/fab";
import AppBar from "../components/appBar";
import Loader from "../components/Loader";

const HomePage = () => {
  return <></>;
};

const seo = {
  title: "Home",
};

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Layout seo={seo}>
        <AppBar title="Reports" url="/" />
        <HomePage />
        <FAB />
      </Layout>
    </div>
  );
}
