"use client";
import { cleanData } from "@/lib/cleandata";
import getBasePath from "@/lib/getBasePath";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";
import React, { useEffect, useState } from "react";

type props = {
  result: Root;
  city?: string;
  waring?: boolean;
};

const GptCard = async ({ result, city, waring }: props) => {
  const [content, setContent] = useState<any>("");
  useEffect(() => {
    const getContent = async () => {
      const cleanedData = cleanData(result, city!);
      const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
        method: "POST",
        body: JSON.stringify({
          weatherData: cleanedData,
        }),
      });
      const gptData = await res.json();
      console.log(gptData.content);
      setContent(gptData.content);
    };
    getContent();
  }, [result, city]);
  //   const cleanedData = cleanData(result, city!);
  //   const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       weatherData: cleanedData,
  //     }),
  //   });F
  //   const gptData = await res.json();
  //   console.log(gptData.content);
  return (
    <Callout
      className="mt-4"
      title={content}
      icon={waring ? ExclamationIcon : CheckCircleIcon}
      color={waring ? "rose" : "teal"}
    />
  );
};

export default GptCard;
