import { useState } from "react";
import "./App.css";
import Searchbar from "./Searchbar";
import Tracks from "./Tracks";

function App() {
  const [data, setData] = useState(null);
  const fetchData = (tracks) => {
    setData(tracks);
    console.log(data);
  };

  const createPlaylist = () => {
    console.log("sdfds");
  };
  return (
    <div className="App">
      <Searchbar func={fetchData} />

      <Tracks tracks={data ? data : null} />
    </div>
  );
}

export default App;
