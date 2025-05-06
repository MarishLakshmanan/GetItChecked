import Lottie from "lottie-react";
import animationData from "./yourAnimation.json";
import { useRef, useEffect } from "react";

export default function ProgressLottie({ percent }) {
  const lottieRef = useRef();

  useEffect(() => {
    const frame = (percent / 100) * lottieRef.current.getDuration(true);
    lottieRef.current.goToAndStop(frame, true);
  }, [percent]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
    />
  );
}
