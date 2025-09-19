import { utilService } from "../services/util.service.js";
import { wactherService } from "../services/watcher.service.js";
const { useState, useEffect } = React;

export function Watchers() {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);
  function onSelect(watcher) {
    setSelectedWatcher(watcher);
  }
  function onRemove(watcherId) {
    const updatedWatchers = watchers.filter(
      (watcher) => watcher.id !== watcherId,
    );
    setWatchers(updatedWatchers);
    utilService.saveToStorage(utilService.STORAGE_KEY, updatedWatchers);
  }

  useEffect(() => {
    getWatchers().then((watchers) => {
      setWatchers(watchers);
    });
  }, []);

  function getWatchers() {
    return new Promise((resolve) => {
      let gCacheWatchers = utilService.loadFromStorage(utilService.STORAGE_KEY);
      if (!gCacheWatchers || gCacheWatchers.length === 0) {
        gCacheWatchers = wactherService.createWatchers();
        utilService.saveToStorage(utilService.STORAGE_KEY, gCacheWatchers);
      }
      resolve(gCacheWatchers);
    });
  }

  function onAddWatcher() {
    const newWatcher = wactherService.createWatcher();
    const updatedWatchers = [...watchers, newWatcher];
    setWatchers(updatedWatchers);
    utilService.saveToStorage(utilService.STORAGE_KEY, updatedWatchers);
  }

  function WatcherDetails({ watchers, onRemove, onselect }) {
    return (
      <div className="watchers-container">
        {watchers.map((watcher) => (
          <div key={watcher.id} className="watcher-card">
            <img src={watcher.url} alt="Watcher Avatar" />
            <h3 className="name">{watcher.fullname}</h3>
            <div className="btn-actions">
              <button
                className="btn-remove"
                onClick={() => onRemove(watcher.id)}
              >
                X
              </button>
              <button className="btn-select" onClick={() => onSelect(watcher)}>
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  function SelectedWatcherModal({ selectedWatcher, onClose }) {
    return (
      <article className="selected-watcher-modal">
        <h1>{selectedWatcher.fullname}</h1>
        <ul>
          {selectedWatcher.movies.map((movie) => (
            <li key={movie}>{movie}</li>
          ))}
        </ul>
        <button className="btn-close-modal" onClick={onClose}>
          Close
        </button>
      </article>
    );
  }

  return (
    <section className="watchers">
      <header>Watcher App</header>
      <button className="btn-add" onClick={onAddWatcher}>
        Add Watcher
      </button>
      {selectedWatcher && (
        <SelectedWatcherModal
          selectedWatcher={selectedWatcher}
          onClose={() => setSelectedWatcher(null)}
        />
      )}
      <WatcherDetails
        watchers={watchers}
        onRemove={onRemove}
        onselect={onSelect}
      />
    </section>
  );
}
