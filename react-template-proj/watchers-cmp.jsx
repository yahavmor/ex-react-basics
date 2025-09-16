import { utilService } from "./services/util.service";
const { useState , useEffect } = React;

const STORAGE_KEY = 'watchers';

function getWatchers() {
  let gCacheWatchers = utilService.loadFromStorage(STORAGE_KEY);
  if (!gCacheWatchers || gCacheWatchers.length === 0) {
    gCacheWatchers = CreateWatchers();
  }
  return gCacheWatchers;
}

function CreateWatchers() {
  const watchers = [];
  for (let i = 0; i < 5; i++) {
    watchers.push(CreateWatcher());
  }
  utilService.saveToStorage(STORAGE_KEY, watchers);
  return watchers;
}

function CreateWatcher() {
  return {
    id: utilService.makeId(),
    fullname: 'benny',
    movies: ['Rambo', 'Rocky']
  };
}

export function Watchers() {
  const [watchers, setWatchers] = useState(getWatchers());

  function onAddWatcher() {
    const newWatcher = CreateWatcher();
    const updatedWatchers = [...watchers, newWatcher];
    setWatchers(updatedWatchers);
    utilService.saveToStorage(STORAGE_KEY, updatedWatchers);
  }

  return (
    <section className="watchers">
      <header>Watcher App</header>
      <button onClick={onAddWatcher}>Add Watcher</button>
      <div className="watchers-container">
        {watchers.map(watcher => (
          <div key={watcher.id} className="watcher-card">
            <h3>{watcher.fullname}</h3>
            <ul>
              {watcher.movies.map((movie, idx) => <li key={idx}>{movie}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
