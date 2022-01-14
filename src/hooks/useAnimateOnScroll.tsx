import { useEffect, useRef } from "react";

type AnimationProps = {
  [key: string]: any;
} | void;

export const useAnimateOnScroll = (
  onScroll: (e: Event) => AnimationProps,
  animateCallback: (timestamp: number, animationProps: AnimationProps) => void
) => {
  const tickingRef = useRef(false);

  const requestTick = (animationProps: AnimationProps) => {
    if (!tickingRef.current) {
      requestAnimationFrame((timestamp) => {
        animateCallback(timestamp, animationProps);
        tickingRef.current = false;
      });
    }
    tickingRef.current = true;
  };

  const animateOnScroll = (e: Event) => {
    const animationProps = onScroll(e);
    requestTick(animationProps);
  };

  useEffect(() => {
    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);
};
