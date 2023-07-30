import React from "react";
import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import CalloutCard from "@/components/CalloutCard";
import StatCard from "@/components/StatCard";
import InformationPanel from "@/components/InformationPanel";
import TempChart from "@/components/TempChart";
import RainChart from "@/components/RainChart";
import HumidityChart from "@/components/HumidityChart";
import { cleanData } from "@/lib/cleandata";
import getBasePath from "@/lib/getBasePath";

type props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};
const WeatherPage = async ({ params: { city, lat, long } }: props) => {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      timezone: "GMT",
      longitude: long,
    },
  });
  console.log(data);

  const result: Root = data.myQuery;
  // const cleanedData = cleanData(result, city);
  // const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     weatherData: cleanedData,
  //   }),
  // });
  // const gptData = await res.json();
  // console.log(gptData.content);

  return (
    <div className="flex flex-col min-h-screen md:flex-row ">
      <InformationPanel city={city} lat={lat} long={long} results={result} />
      <div className="flex-1 p-5 lg:p-10 ">
        <div className="pb-5 ">
          <div className="pb-5 ">
            <h2 className="text-xl font-bold ">Today Overview</h2>
            <p className="text-sm text-gray-400 ">
              Last updated at:
              {new Date(result.current_weather.time).toLocaleString()}(
              {result.timezone})
            </p>
          </div>
          <div className="m-2 mb-10 ">
            {/* <CalloutCard message={gptData.content} /> */}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2 ">
            <StatCard
              title="Maximum temperature "
              metric={`${result.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="yellow"
            />
            <StatCard
              title="Minimum temperature "
              metric={`${result.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="green"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={`${result.daily.uv_index_max[0].toFixed(1)}`}
                color="green"
              />
              {Number(result.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  waring
                  message="The value of UV is high today, please wear SPF!"
                />
              )}
            </div>
            <div className="flex space-x-3 ">
              <StatCard
                title="Wind speed"
                metric={`${result.current_weather.windspeed.toFixed(1)} km/h`}
                color="cyan"
              />
              <StatCard
                title="Wind direction"
                metric={`${result.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5  " />
        <div className="space-y-3 ">
          <TempChart results={result} />
          <RainChart results={result} />
          <HumidityChart results={result} />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
