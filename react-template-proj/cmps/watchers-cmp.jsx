import { utilService } from "../services/util.service.js";

const { useState , useEffect } = React;


export function Watchers() {
  const [watchers, setWatchers] = useState(getWatchers());

  function getWatchers() {
    let gCacheWatchers = utilService.loadFromStorage(utilService.STORAGE_KEY);
    if (!gCacheWatchers || gCacheWatchers.length === 0) {
      gCacheWatchers = CreateWatchers();
    }
    return gCacheWatchers;
  }
  
  
  function CreateWatchers() {
    const watchers = [];
    for (let i = 0; i < 3; i++) {
      watchers.push(CreateWatcher());
    }
    utilService.saveToStorage(utilService.STORAGE_KEY, watchers);
    return watchers;
  }
  
  function CreateWatcher() {
    return {
      id: utilService.makeId(),
      fullname: utilService.makeLorem(1),
      movies: [utilService.makeLorem(2), utilService.makeLorem(2)]
    };
  }
  

  function onAddWatcher() {
    const newWatcher = CreateWatcher();
    const updatedWatchers = [...watchers, newWatcher];
    setWatchers(updatedWatchers);
    utilService.saveToStorage(utilService.STORAGE_KEY, updatedWatchers);
  }
  function onRemove(watcherId) {
    utilService.remove(watcherId)
        .then(() => {
          setWatchers(watchers => watchers.filter(watcher => watcher.id !== watcherId))
        })
}
function onSelect(){
  utilService.onSelect
}

  return (
    <section className="watchers">
      <header>Watcher App</header>
      <button className="btn-add" onClick={onAddWatcher}>Add Watcher</button>
      <div className="watchers-container">
        {watchers.map(watcher => (
          <div key={watcher.id} className="watcher-card">
            <img src="/assets/img/avatar.png"/>
            <h3 className="name">{watcher.fullname}</h3>
            <div className="btn-actions">
            <button className="btn-remove" onClick={() => onRemove(watcher.id)} >X</button>
              <button className="btn-select" onClick={() => onSelect(watcher.id)}>Select</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
