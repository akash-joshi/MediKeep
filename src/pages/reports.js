import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";

import styled from "styled-components";

import { Dropdown } from "semantic-ui-react";

import Layout from "../components/layout";
import FAB from "../components/fab";
import AppBar from "../components/appBar";
import Loader from "../components/Loader";

import Reports from "../temp_assests/reports.json";

import ReportCards from "../components/Containers/ReportCards";

const FilterGrid = styled.div`
  margin: 0.2em 0;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-gap: 10px;
`;

const DropdownList = [
  {
    text: "Blood",
    value: "Blood",
  },
  {
    text: "Sugar Yes Please",
    value: "Sugar Yes Please",
  },
  {
    text: "Say No More",
    value: "Say No More",
  },
  {
    text: "No Filters",
    value: "Filter",
  },
];

const HomePage = () => {
  const [sort, setSort] = useState("Sort");
  const [filter, setFiler] = useState("Filter");

  return (
    <>
      <FilterGrid>
        <Dropdown
          text={sort}
          icon="filter"
          floating
          labeled
          button
          className="icon"
          options={[
            {
              text: "Newest",
              value: "Newest",
            },
            {
              text: "Oldest",
              value: "Oldest",
            },
          ]}
          onChange={(e, { value }) => {
            setSort(value);
          }}
        />
        <Dropdown
          text={filter}
          icon="filter"
          floating
          labeled
          button
          className="icon"
          options={DropdownList}
          onChange={(e, { value }) => {
            setFiler(value);
          }}
        />
      </FilterGrid>
      {Reports.map((report, index) => (
        <div key={index}>
          {filter == "Filter" ? (
            <ReportCards
              category={report.category}
              items={report.items}
              key={index}
              url="/"
            />
          ) : report.category == filter ? (
            <ReportCards
              category={report.category}
              items={report.items}
              key={index}
              url="/"
            />
          ) : (
            <></>
          )}
        </div>
      ))}
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
        <AppBar title="Reports" url="/" />
        <HomePage />
        <FAB />
      </Layout>
    </div>
  );
}
