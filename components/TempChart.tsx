"use client";
import { Card, AreaChart, Title } from "@tremor/react";
import React from "react";
type props = {
  results: Root;
};

const TempChart = ({ results }: props) => {
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
      "Temperature (C)": results.hourly.temperature_2m[i],
      "UV Index": results.hourly.uv_index[i],
    };
  });

  const dataFormatter = (value: number) => {
    return `${value} °C`;
  };
  return (
    <Card title=" ">
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6 "
        data={data}
        showLegend
        index="time"
        categories={["Temperature (C)", "UV Index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default TempChart;
