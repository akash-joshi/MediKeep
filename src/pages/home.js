import React, { useEffect, useState, useContext } from "react";
import { Link } from "gatsby";
import { compose } from "recompose";
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import CardContainer from "../components/Containers/CardContainer";
import CleanButton from "../components/Buttons/CleanButton";
import Layout from "../components/layout";
import Loader from "../components/Loader";
import TopicCard from "../components/Home/TopicCard";
import MockCard from "../components/Home/MockCard";

const HomePage = () => {
  return <></>;
};

const seo = {
  title: "Home",
};

export default function Home() {
  return (
    <Layout seo={seo}>
      <HomePage />
    </Layout>
  );
}
