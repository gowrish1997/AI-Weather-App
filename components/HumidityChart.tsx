"use client";
import { Card, AreaChart, Title } from "@tremor/react";
import React from "react";
type props = {
  results: Root;
};

const HumidityChart = ({ results }: props) => {
  const hourly = results.hourly.time
    .map((time, index) => {
      return new Date(time).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: false,
      });
    })
    .slice(0, 24);

  const data = hourly.map((hour, i) => {
    return {
      time: Number(hour),
      "Humidity (%)": results.hourly.relativehumidity_2m[i],
    };
  });

  const dataFormatter = (value: number) => {
    return `${value} %`;
  };
  return (
    <Card title=" ">
      <Title>Humidity Levels</Title>
      <AreaChart
        className="mt-6 "
        data={data}
        showLegend
        index="time"
        categories={["Humidity (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default HumidityChart;
