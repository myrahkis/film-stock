import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import ButtonHeader from "./components/buttonHeader";
import UserList from "./components/userList";

const defaultShows = [
  {
    imdbID: "tt1520211",
    Title: "The walking dead",
    Year: "2010",
    Poster:
      "https://www.filmtv.it/imgbank/GALLERYXL/R201512/walking-dead_00.jpg",
    runtime: 44,
    rating: 8.1,
    userRating: 7.5,
  },
  {
    imdbID: "tt0903747",
    Title: "Breaking Bad",
    Year: "2008",
    Poster: "https://www.filmtv.it/imgbank/GALLERYXL/R201605/00-40.jpg",
    runtime: 45,
    rating: 9.5,
    userRating: 9.5,
  },
  {
    imdbID: "tt0413573",
    Title: "Grey's Anatomy",
    Year: "2005",
    Poster: "https://www.filmtv.it/imgbank/GALLERYXL/R201608/grey00.jpg",
    runtime: 41,
    rating: 7.5,
    userRating: 6.2,
  },
];

function App() {
  const [openHome, setOpenHome] = useState(true);
  const [openWatched, setOpenWatched] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [search, setSearch] = useState("");
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [watchedList, setWatchedList] = useState(function () {
    let storedVals = localStorage.getItem("watched");

    if (storedVals === null) return (storedVals = []);

    return JSON.parse(storedVals);
  });
  const [favsList, setFavsList] = useState(function () {
    let storedVals = localStorage.getItem("liked");

    if (storedVals === null) return (storedVals = []);

    return JSON.parse(storedVals);
  });

  const isLiked = favsList.map((show) => show.imdbID).includes(selected);

  useEffect(function listeningToEsc() {
    function callback(e) {
      if (e.code === "Escape") {
        setOpenHome(true);
        setOpenWatched(false);
        setOpenFav(false);
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watchedList));
    },
    [watchedList]
  );

  useEffect(
    function () {
      localStorage.setItem("liked", JSON.stringify(favsList));
    },
    [favsList]
  );

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
  }

  function deleteWatchedHandle(id) {
    setWatchedList((watchedList) =>
      watchedList.filter((show) => show.imdbID !== id)
    );
  }
  function deleteFavsHandle(id) {
    setFavsList((favsList) => favsList.filter((show) => show.imdbID !== id));
  }

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        results={shows}
        defaultShows={defaultShows}
      >
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
        {openWatched && (
          <UserList
            list={watchedList}
            onDelete={deleteWatchedHandle}
            isLike={isLiked}
          />
        )}
        {openFav && <UserList list={favsList} onDelete={deleteFavsHandle} />}
        {openHome && (
          <Home
            searchShow={search}
            defaultShows={defaultShows}
            shows={shows}
            setShows={setShows}
            selected={selected}
            setSelected={setSelected}
            onWatched={addToWatchedHandle}
            onLike={likeShowHandle}
            watchedList={watchedList}
            isLiked={isLiked}
          />
        )}
      </div>
    </div>
  );
}

export default App;
