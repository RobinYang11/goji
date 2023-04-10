import { useEffect, useRef, useState } from "react";

export default function useCountdown(time: number) {
  const [date, setDate] = useState(time);
  const timeRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    //timeRef.current是定时器
    timeRef.current = setInterval(() => {
      setDate((t) => t - 1);
    }, 1000);

    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  useEffect(() => {
    if (date <= 0) {
      clearInterval(timeRef.current);
    }
  }, [date]);

  return {
    date,
  };
}
