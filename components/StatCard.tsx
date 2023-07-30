"use strict";
import React from "react";
import { Card, Metric, Text, Color } from "@tremor/react";

type props = {
  title: string;
  metric: string;
  color?: Color;
};

const StatCard = ({ title, metric, color }: props) => {
  return (
    <Card className=" " decoration="top" decorationColor={color}>
      <Text className="">{title}</Text>
      <Metric className="">{metric}</Metric>
    </Card>
  );
};

export default StatCard;
