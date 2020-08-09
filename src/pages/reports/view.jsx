import React, { useEffect, useState } from "react";

import { useSearchParam } from "react-use";

import Layout from "../../components/layout";
import FAB from "../../components/fab";
import AppBar from "../../components/appBar";

import ViewReportCard from "../../components/Containers/ViewReportCard";

const ViewReport = () => {
  const id = useSearchParam("id");

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        id: 1,
        title: "Too high",
        description: "Good Report",
        media: [
          "https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/page_content/images/OnlineReportingTool.jpg",
          "https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/page_content/images/OnlineReportingTool.jpg",
          "https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/page_content/images/OnlineReportingTool.jpg",
        ],
        tags: ["Blood Sugar"],
        created_at: "2020-02-01T00:00:00Z",
      },
    ]);
  }, [id]);

  return (
    <>
      <div>
        {items.length > 0 &&
          items.map((info, index) => (
            <ViewReportCard key={index} info={info} show={true} />
          ))}
      </div>
    </>
  );
};

const seo = {
  title: "Reports",
};

export default function View() {
  const title = useSearchParam("title");
  const category = useSearchParam("category");

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppBar
        title={title}
        url={`/reports/category?id=${category}`}
        show={true}
      />
      <Layout seo={seo}>
        <ViewReport />
        <FAB />
      </Layout>
    </div>
  );
}
