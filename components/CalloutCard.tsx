"use client";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";
import React from "react";
type props = {
  message: string;
  waring?: boolean;
};

const CalloutCard = ({ message, waring }: props) => {
  return (
    <Callout
      className="mt-4"
      title={message}
      icon={waring ? ExclamationIcon : CheckCircleIcon}
      color={waring ? "rose" : "teal"}
    />
  );
};

export default CalloutCard;
