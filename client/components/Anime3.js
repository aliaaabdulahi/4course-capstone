import React from "react";
import Lottie from "react-lottie";
import animationData from "../../lotties/15343-t (1).json";

export default function Anime3() {
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
