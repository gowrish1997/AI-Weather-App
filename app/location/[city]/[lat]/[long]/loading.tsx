import React from "react";
import { SunIcon } from "@heroicons/react/solid";
const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394f68] to-[#18387e] flex flex-col items-center justify-center text-slate-500 ">
      <SunIcon
        className="animate-bounce h-20 w-20 text-yellow-500 "
        color="yellow"
      />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading City Weather Information
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse ">
        Hold on, we are crunching the numbers & generating an AI summary of the
        Weather!
      </h2>
    </div>
  );
};

export default Loading;
