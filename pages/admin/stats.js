import React, { useState, useEffect } from "react";
import { fetchQuery } from "../../helpers/fetch";
import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=' >-.2f'
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    motionConfig='stiff'
  />
);

const AdminObjektStats = () => {
  /*

        Data model:
        {
            nazev: "home16",
            pocet_zobrazeni: 123431432 
        }
    */

  const [statistic, setStatistics] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const fetchData = async () => {
    const response = await fetchQuery("objekt-infos/60283664aec45b2c4065339d");
    console.log(response.statistiky);

    setStatistics(response.statistiky);
  };

  const formatData = () => {
    let resultData = [];
    const regex = /(?<string>[a-z_]{0,})(?<number>\d{0,})/;

    const names = statistic.map((statisticItem) => {
      const regexMatch = statisticItem.nazev.match(regex);
      let { string, number } = regexMatch.groups;
      const name = string.replace("_", "");

      if (number) {
        const finalDataItem = {
          x: `20${number}`,
          y: parseInt(statisticItem.pocet_zobrazeni),
        };

        let foundYear = resultData.find((item) => item.id === name);

        if (foundYear) {
          foundYear.data = [...foundYear.data, finalDataItem];
        } else {
          resultData.push({
            id: name,
            color: "rgb(0, 0, 172)",
            data: [finalDataItem],
          });
        }
        return {
          year: parseInt(number),
          name,
          value: statisticItem.pocet_zobrazeni,
        };
      }
    });

    setGraphData(resultData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (statistic) {
      formatData();
    }
  }, [statistic]);

  return (
    <>
      <h1>Hello world</h1>
      {graphData && <MyResponsiveLine data={graphData} />}
    </>
  );
};

export default AdminObjektStats;
