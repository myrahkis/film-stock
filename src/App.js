import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Watched from "./components/watched";
import Favs from "./components/favs";

function App() {
  const [openHome, setOpenHome] = useState(true);
  const [openWatched, setOpenWatched] = useState(false);
  const [openFav, setOpenFav] = useState(false);

  function openHomeHandle() {
    setOpenHome(!openHome);
    setOpenFav(false);
    setOpenWatched(false);
  }
  function openWatchedHandle() {
    setOpenWatched(!openWatched);
    setOpenHome(false);
    setOpenFav(false);
  }
  function openFavHandle() {
    setOpenFav(!openFav);
    setOpenHome(false);
    setOpenWatched(false);
  }

  return (
    <div className="App">
      <Header
        onHome={openHomeHandle}
        onWatched={openWatchedHandle}
        onFav={openFavHandle}
        openWatched={openWatched}
        openFav={openFav}
        openHome={openHome}
      />
      { openWatched && <Watched /> }
      { openFav && <Favs /> }
    </div>
  );
}

export default App;
