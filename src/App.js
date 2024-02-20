import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Watched from "./components/watched";
import Favs from "./components/favs";
import Home from "./components/home";
import ButtonHeader from "./components/buttonHeader";

function App() {
  const [openHome, setOpenHome] = useState(true);
  const [openWatched, setOpenWatched] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [search, setSearch] = useState("");

  function openHomeHandle() {
    setOpenHome(true);
    setOpenFav(false);
    setOpenWatched(false);
  }
  function openWatchedHandle() {
    setOpenWatched(true);
    setOpenHome(false);
    setOpenFav(false);
  }
  function openFavHandle() {
    setOpenFav(true);
    setOpenHome(false);
    setOpenWatched(false);
  }

  return (
    <div className="App">
      <Header search={search} setSearch={setSearch}>
        <ButtonHeader opened={openHome} setter={openHomeHandle}>
          ShowSlayer
        </ButtonHeader>
        <ButtonHeader opened={openWatched} setter={openWatchedHandle}>
          Watched
        </ButtonHeader>
        <ButtonHeader opened={openFav} setter={openFavHandle}>
          Favourites
        </ButtonHeader>
      </Header>
      <div className="container-main main">
        {openWatched && <Watched />}
        {openFav && <Favs />}
        {openHome && <Home searchShow={search} />}
      </div>
    </div>
  );
}

export default App;
