import React, { useState, useEffect } from 'react';

const LoadingText = () => {
  const [dots, setDots] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        if (dots >= 3) {
          setDots(0);
        } else {
          setDots(dots + 1);
        }
      }, 500)
    );
  }, [dots]);
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <h2 className="rfu-text__loading">{`Loading data${'.'.repeat(dots)}`}</h2>
  );
};

export default LoadingText;
