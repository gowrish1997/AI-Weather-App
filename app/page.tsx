"use client";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
import CityPicker from "@/components/CityPicker";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394f68] to-[#18387e] p-10 flex  flex-col justify-center items-center  ">
      <Card className="max-w-4xl mx-auto bg-white">
        <h1 className="text-6xl font-bold text-center mb-10 ">Home</h1>
        <Subtitle className="text-xl text-center ">
          powered by open ai next js tailwind
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-[#394f68] to-[#18387e] ">
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
