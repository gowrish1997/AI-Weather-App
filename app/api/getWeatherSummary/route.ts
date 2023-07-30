import openai from "@/openai";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "Pretend you are a weather news presenter LIVE on television. be energatic and full of charisma. Introduce yourself as gowrish and say you are LIVE from the weather channel. State the city you are providing summary for. Then give a summary of days weather only. Make it easy for the the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV index is high. use the uv_index data provided to provide UV advice.Provide a joke refarding the weather. Assume the data came from team at the news office and not the user",
      },
      {
        role: "user",
        content: `Hi there, can i get a summary of todays weather, use the following information to get the weather data:${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });
  const { data } = response;
  console.log(data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}
