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
        description:
          "Logging is an important topic in software development, especially if you need to analyze bugs and other unexpected events in your production environment. Implementing your logging often seems easy. But as you probably experienced yourself, logging is far more complex than it might seem. That’s why you can find lots of articles about it here on the blog.",
        media: [
          "https://sites.google.com/site/helpbikas/_/rsrc/1472868664768/medical-reports/Bikash%20-%20Medical%20Report.jpg?height=400&width=290",
          "https://www.dotxls.org/wp-content/uploads/2016/05/MEDICAL-REPORT.png",
          "https://sites.google.com/site/helpbikas/_/rsrc/1472868664768/medical-reports/Bikash%20-%20Medical%20Report.jpg?height=400&width=290",
          "https://www.dotxls.org/wp-content/uploads/2016/05/MEDICAL-REPORT.png",
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
