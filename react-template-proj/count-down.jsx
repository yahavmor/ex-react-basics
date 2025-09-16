const { useState, useEffect, useRef } = React;

export function CountDown({ toTime, startFrom, onDone }) {
  const [count, setCount] = useState(() => {
    const now = Date.now();
    return toTime > now ? Math.ceil((toTime - now) / 1000) : startFrom;
  });

  const counterRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const remaining = Math.ceil((toTime - now) / 1000);

      if (remaining <= 0) {
        clearInterval(intervalId);
        setCount(0);
        onDone();
      } else {
        setCount(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [toTime, onDone]);

  useEffect(() => {
    if (count <= 6 && counterRef.current) {
      counterRef.current.style.color = 'red';
    }
  }, [count]);

  return (
    <div className="counter">
      Time Remains: <span ref={counterRef}>{String(count).padStart(2, '0')}</span>
    </div>
  );
}
