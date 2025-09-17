const { useState , useEffect } = React;

function getSeason(month) {
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Autumn';
  return 'Winter';
}

export function SeasonClock() {
  const [isDark, setIsDark] = useState(false);
  const [count, setCount] = useState(0);
  

  useEffect(() => {
      const intervalId = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
  
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dayNumber = now.getDate();
  const year = now.getFullYear();
  const season = getSeason(now.getMonth() + 1);

  function toggleTheme() {
    setIsDark(prev => !prev);
  }

  return (
    <section
      className={`season-clock-container ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
    >
      <h1 className="header">{monthName} ({season})</h1>
      <img src={`/seasons/${season}.png`} alt={`Season: ${season}`} />
      <h3 className="sub-header">{dayName}, {dayNumber} {monthName} {year}</h3>
      <div className="timer"><span>display time: {count}</span></div>
    </section>
  );
}