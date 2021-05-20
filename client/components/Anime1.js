import React from "react";
import Lottie from "react-lottie";
import animationData from "../../lotties/62265-walking-taco (1).json";

export default function Anime1() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
