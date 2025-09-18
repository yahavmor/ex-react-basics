import { utilService } from "../services/util.service.js";
const { useState, useEffect } = React;

const movieTitles = [
  "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction", "Forrest Gump",
  "Inception", "Fight Club", "The Matrix", "Goodfellas", "The Lord of the Rings: The Return of the King",
  "Interstellar", "The Silence of the Lambs", "Saving Private Ryan", "The Green Mile", "Gladiator",
  "Titanic", "Schindler's List", "The Departed", "Whiplash", "The Prestige",
  "Django Unchained", "The Lion King", "Avengers: Endgame", "Parasite", "Joker",
  "Toy Story", "Up", "WALL·E", "Coco", "Inside Out",
  "Finding Nemo", "Ratatouille", "Monsters, Inc.", "Frozen", "Moana",
  "Harry Potter and the Sorcerer's Stone", "Harry Potter and the Prisoner of Azkaban", "Fantastic Beasts", "The Hunger Games", "Twilight",
  "The Social Network", "The Wolf of Wall Street", "Catch Me If You Can", "The Truman Show", "Cast Away",
  "The Revenant", "Birdman", "La La Land", "A Star Is Born", "Bohemian Rhapsody",
  "Black Panther", "Doctor Strange", "Iron Man", "Captain America: Civil War", "Guardians of the Galaxy",
  "Spider-Man: No Way Home", "The Amazing Spider-Man", "Logan", "Deadpool", "X-Men: Days of Future Past",
  "Star Wars: A New Hope", "Star Wars: The Empire Strikes Back", "Star Wars: The Force Awakens", "Rogue One", "Solo",
  "Indiana Jones and the Last Crusade", "Jurassic Park", "Jurassic World", "E.T. the Extra-Terrestrial", "Back to the Future",
  "The Breakfast Club", "Ferris Bueller's Day Off", "Mean Girls", "Clueless", "10 Things I Hate About You",
  "The Notebook", "A Walk to Remember", "Pride & Prejudice", "Little Women", "La La Land",
  "The Grand Budapest Hotel", "Moonrise Kingdom", "The Royal Tenenbaums", "Her", "Ex Machina",
  "Blade Runner 2049", "Arrival", "Gravity", "The Martian", "Ad Astra",
  "The Conjuring", "Insidious", "Get Out", "A Quiet Place", "It",
  "Knives Out", "Glass Onion", "Gone Girl", "Prisoners", "Shutter Island"
];
const robotNames = [
  "RoboX", "MechaZ", "ByteBot", "Circuitron", "NanoDroid", "ZetaPrime", "AlphaCore", "Cyberon",
  "Voltix", "NeuroBot", "GigaTron", "SparkUnit", "AutoMech", "Botzilla", "QuantumX", "ServoMax",
  "IronByte", "PixelBot", "MetaDroid", "EchoUnit", "CoreBot", "Synthron", "TurboBot", "Mechanoid",
  "DataSpark", "RoboNova", "XenoBot", "FusionBot", "Logicron", "Botnik", "Neutronix", "HexaBot",
  "RoboSnap", "CyberSpark", "ZenoCore", "ByteForge", "NanoSpark", "MechX", "RoboPulse", "AutoCore",
  "BotVerse", "QuantumBot", "VoltEdge", "CyberNova", "IronSpark", "NeuroCore", "BotFusion", "ServoX",
  "PixelCore", "MetaSpark", "EchoBot", "CoreX", "SynthBot", "TurboCore", "MechSpark", "DataBot",
  "RoboPrime", "XenoCore", "FusionCore", "LogicBot", "BotCore", "NeutronBot", "HexaCore", "SnapBot",
  "CyberByte", "ZenoBot", "ByteCore", "NanoBot", "MechCore", "PulseBot", "AutoBot", "VerseBot",
  "QuantumCore", "VoltBot", "NovaBot", "IronBot", "NeuroBotX", "FusionX", "ServoBot", "PixelX",
  "MetaBot", "EchoCore", "CoreBotX", "SynthX", "TurboBotX", "SparkBot", "DataCore", "PrimeBot",
  "XenoX", "LogicX", "BotSpark", "NeutronX", "HexaX", "SnapCore", "CyberX", "ZenoX", "ByteX", "NanoX"
];

export function Watchers() {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);

  useEffect(() => {
    getWatchers().then(watchers => {
      setWatchers(watchers);
    });
  }, []);

  function getWatchers() {
    return new Promise(resolve => {
      let gCacheWatchers = utilService.loadFromStorage(utilService.STORAGE_KEY);
      if (!gCacheWatchers || gCacheWatchers.length === 0) {
        gCacheWatchers = createWatchers();
        utilService.saveToStorage(utilService.STORAGE_KEY, gCacheWatchers);
      }
      resolve(gCacheWatchers);
    });
  }

  function createWatchers() {
    const watchers = [];
    for (let i = 0; i < 3; i++) {
      watchers.push(createWatcher());
    }
    return watchers;
  }

  function getMovies() {
    return movieTitles;
  }

  function getRobotNames() {
    return robotNames;
  }

  function randRobotName() {
    const robots = getRobotNames();
    return robots[utilService.getRandomIntInclusive(0, robots.length - 1)];
  }

  function randMovies() {
    const movies = getMovies();
    const randMovies = [];
    for (let i = 0; i < 3; i++) {
      randMovies.push(movies[utilService.getRandomIntInclusive(0, movies.length)]);
    }
    return randMovies;
  }

  function createWatcher() {
    const name = randRobotName();
    return {
      id: utilService.makeId(),
      url: `https://robohash.org/${name}`,
      fullname: name,
      movies: randMovies()
    };
  }

  function onAddWatcher() {
    const newWatcher = createWatcher();
    const updatedWatchers = [...watchers, newWatcher];
    setWatchers(updatedWatchers);
    utilService.saveToStorage(utilService.STORAGE_KEY, updatedWatchers);
  }

  function onRemove(watcherId) {
    const updatedWatchers = watchers.filter(watcher => watcher.id !== watcherId);
    setWatchers(updatedWatchers);
    utilService.saveToStorage(utilService.STORAGE_KEY, updatedWatchers);
  }

  function onSelect(watcher) {
    setSelectedWatcher(watcher);
  }

  return (
    <section className="watchers">
      <header>Watcher App</header>
      <button className="btn-add" onClick={onAddWatcher}>Add Watcher</button>
      {selectedWatcher &&(<SelectedWatcherModal
      selectedWatcher={selectedWatcher}
      onClose={() => setSelectedWatcher(null)}
      />)}
      <WatcherDetails
        watchers={watchers}
        onRemove={onRemove}
        onSelect={onSelect}
      /> 
    </section>
  );
}



function SelectedWatcherModal({ selectedWatcher, onClose }) {
  return (
    <article className="selected-watcher-modal">
      <h1>{selectedWatcher.fullname}</h1>
      <ul>
        {selectedWatcher.movies.map(movie => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
      <button className="btn-close-modal" onClick={onClose}>Close</button>
    </article>
  );
}

function WatcherDetails({ watchers, onRemove, onSelect }) {
  return (
    <div className="watchers-container">
      {watchers.map(watcher => (
        <div key={watcher.id} className="watcher-card">
          <img src={watcher.url} alt="Watcher Avatar" />
          <h3 className="name">{watcher.fullname}</h3>
          <div className="btn-actions">
            <button className="btn-remove" onClick={() => onRemove(watcher.id)}>X</button>
            <button className="btn-select" onClick={() => onSelect(watcher)}>Select</button>
          </div>
        </div>
      ))}
    </div>
  );
}