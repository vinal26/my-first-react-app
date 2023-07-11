import React from "react";
import { Line } from "react-chartjs-2";
import { MdArrowForwardIos } from "react-icons/md";

const CareTeamChart = () => {
  const resObj = {
    0: 100,
    5: 200,
    10: 150,
    15: 250,
    20: 200,
    25: 250,
    30: 500,
  };

  const data = {
    labels: Object.keys(resObj),
    datasets: [
      {
        label: "Totel Members",
        data: Object.values(resObj),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const data2 = {
    labels: Object.keys(resObj),
    datasets: [
      {
        label: "Totel Encounters",
        data: Object.values(resObj),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="chartbox_chart5 py-3 px-3">
          <p>Totel Members</p>
            <Line
              height={"100%"}
              options={{ maintainAspectRatio: false }}
              data={data}
            />
          </div>
          <p className="careteam_para0 mt-2">View List <MdArrowForwardIos /></p>
        </div>

        <div className="col-md-6">
          <div className="chartbox_chart5 py-3 px-3">
          <p>Totel Encounters</p>
            <Line
              height={"100%"}
              options={{ maintainAspectRatio: false }}
              data={data2}
            />
          </div>
          <p className="careteam_para0 mt-2">View Charts <MdArrowForwardIos /></p>
        </div>
      </div>
    </>
  );
};

export default CareTeamChart;
