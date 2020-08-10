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
        title: "Sugar Too high",
        description:
          "The doctor recommended me to eat less carbs. Have a more fat and protein based diet. Eat eggs at least twice a day.",
        media: [
          "https://sites.google.com/site/helpbikas/_/rsrc/1472868664768/medical-reports/Bikash%20-%20Medical%20Report.jpg?height=400&width=290",
          "https://www.dotxls.org/wp-content/uploads/2016/05/MEDICAL-REPORT.png",
          "https://sites.google.com/site/helpbikas/_/rsrc/1472868664768/medical-reports/Bikash%20-%20Medical%20Report.jpg?height=400&width=290",
          "https://www.dotxls.org/wp-content/uploads/2016/05/MEDICAL-REPORT.png",
        ],
        tags: ["Blood Sugar"],
        created_at: "2020-04-04T00:00:00Z",
      },
      {
        id: 2,
        title: "Sugar Too Low",
        description: "Good Report",
        media: [
          "https://sites.google.com/site/helpbikas/_/rsrc/1472868664768/medical-reports/Bikash%20-%20Medical%20Report.jpg?height=400&width=290",
          "https://www.dotxls.org/wp-content/uploads/2016/05/MEDICAL-REPORT.png",
          "https://sites.google.com/site/helpbikas/_/rsrc/1472868664768/medical-reports/Bikash%20-%20Medical%20Report.jpg?height=400&width=290",
          "https://www.dotxls.org/wp-content/uploads/2016/05/MEDICAL-REPORT.png",
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
