import React, { useState, useEffect } from 'react';

interface CountdownProps {
  electionDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ electionDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = electionDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [electionDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex space-x-3">
      <div className="countdown-item">
        <span className="countdown-number">{formatNumber(timeLeft.days)}</span>
        <span className="countdown-label">일</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{formatNumber(timeLeft.hours)}</span>
        <span className="countdown-label">시</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>
        <span className="countdown-label">분</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{formatNumber(timeLeft.seconds)}</span>
        <span className="countdown-label">초</span>
      </div>
    </div>
  );
};

export default Countdown; 