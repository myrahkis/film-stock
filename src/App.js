import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import ButtonHeader from "./components/buttonHeader";
import UserList from "./components/userList";

function App() {
  const [openHome, setOpenHome] = useState(true);
  const [openWatched, setOpenWatched] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [search, setSearch] = useState("");
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [watchedList, setWatchedList] = useState([]);
  const [favsList, setFavsList] = useState([]);

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

  function addToWatchedHandle(show) {
    setWatchedList((watchedList) => [...watchedList, show]);
  }
  function likeShowHandle(show) {
    setFavsList((favsList) => [...favsList, show]);

    // !! перенести это на страницу избранного !!

    // if (liked ) {
    //   setFavsList((favsList) =>
    //     favsList.filter((favShow) => favShow.imdbID !== show)
    //   );
    // }
  }
  function checkIfLiked(show) {
    if (favsList.indexOf(show)) {
      return true;
    }
  }
  console.log(watchedList);

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
        {openWatched && <UserList list={watchedList} />}
        {openFav && <UserList list={favsList} />}
        {openHome && (
          <Home
            searchShow={search}
            shows={shows}
            setShows={setShows}
            selected={selected}
            setSelected={setSelected}
            onWatched={addToWatchedHandle}
            onLike={likeShowHandle}
            checkIfLiked={checkIfLiked}
            watchedList={watchedList}
            favsList={favsList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
