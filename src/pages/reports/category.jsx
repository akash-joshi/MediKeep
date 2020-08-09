import React, { useEffect, useState } from "react";

import { useSearchParam } from "react-use";

import Layout from "../../components/layout";
import FAB from "../../components/fab";
import AppBar from "../../components/appBar";

import PreviewCard from "../../components/Containers/PreviewCard";

const ReportCategory = () => {
  const category = useSearchParam("id");

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
      {
        id: 2,
        title: "Too Low",
        description: "Good Report",
        media: [
          "https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/page_content/images/OnlineReportingTool.jpg",
          "https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/page_content/images/OnlineReportingTool.jpg",
          "https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/page_content/images/OnlineReportingTool.jpg",
        ],
        tags: ["Blood Sugar"],
        created_at: "2020-03-01T00:00:00Z",
      },
    ]);
  }, [category]);

  return (
    <>
      <div>
        {items.length > 0 &&
          items.map((info, index) => (
            <PreviewCard
              key={index}
              info={info}
              show={true}
              category={category}
            />
          ))}
      </div>
    </>
  );
};

const seo = {
  title: "Reports",
};

export default function ViewReportCategory() {
  const category = useSearchParam("id");

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppBar title={category} url="/reports" show={true} />
      <Layout seo={seo}>
        <ReportCategory />
        <FAB />
      </Layout>
    </div>
  );
}
