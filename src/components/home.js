import React, { useEffect, useState } from "react";
import "./home.css";
import StarRating from "./starRating";

const KEY = "affef0d";

function Home({
  searchShow,
  shows,
  setShows,
  selected,
  setSelected,
  onWatched,
  onLike,
  watchedList,
  setCollapseMenu,
  defaultShows,
  isLiked,
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function openHadle(show) {
    setOpen(true);
    setSelected(show.imdbID);
    setCollapseMenu(false);
    // console.log(show);
  }

  // можно переделать в функцию handle и не исп useEffect
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchShows() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${searchShow}&type=series`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with shows loading:(");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error("Cannot find the show");

          setShows(data.Search);
          setError("");
        } catch (e) {
          console.error(e.message);

          if (e.name !== "AbortError") setError(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (searchShow.length < 3) {
        setShows(defaultShows);
        setError("");
        return;
      }

      fetchShows();

      return () => controller.abort();
    },
    [defaultShows, searchShow, setShows]
  );

  useEffect(function listeningToEsc() {
    function callback(e) {
      if (e.code === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <>
      {shows === defaultShows ? (
        <h2
          style={{
            marginBottom: "10px",
            color: "aliceblue",
            fontWeight: "800",
          }}
        >
          Hits
        </h2>
      ) : (
        <h2
          style={{
            marginBottom: "10px",
            color: "aliceblue",
            fontWeight: "800",
          }}
        >
          Search results
        </h2>
      )}
      {isLoading && <Loader />}
      {error && <Error msg={error} />}
      {!isLoading && !error && (
        <div className="boxes-wrapper">
          <ul className={!open ? "list" : "list-box"}>
            {shows?.map((show) => (
              <li
                className={!open ? "show" : "show-box"}
                key={show.imdbID}
                onClick={() => openHadle(show)}
              >
                <img
                  src={
                    show.Poster !== "N/A"
                      ? show.Poster
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                  }
                  alt="sorry"
                  className={!open ? "poster" : "poster-box"}
                />
                <div className="info-box">
                  <p
                    role="button"
                    style={{
                      cursor: "pointer",
                      maxWidth: "190px",
                      textWrap: "wrap",
                      fontWeight: "700",
                    }}
                  >
                    {show.Title}
                  </p>
                  <div className={!open ? "wrapper-closed" : "wrapper-box"}>
                    <p>
                      <span>📅</span>
                      {show.Year}
                    </p>
                    {/* <p>
                      <span>⭐</span> {show.rating}
                    </p> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {open && (
            <RateAShow
              // key={selected.imdbID}
              selectedShow={selected}
              onBack={setOpen}
              onWatched={onWatched}
              onLike={onLike}
              watchedList={watchedList}
              // favsList={favsList}
              isLiked={isLiked}
              shows={shows}
            ></RateAShow>
          )}
        </div>
      )}
    </>
  );
}

function RateAShow({
  selectedShow,
  onBack,
  onWatched,
  onLike,
  watchedList,
  isLiked,
  shows,
}) {
  const [showDetails, setShowDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watchedList
    .map((show) => show.imdbID)
    .includes(selectedShow); // такое же для лайков мб

  const watchedUserRating = watchedList.find(
    (show) => show.imdbID === selectedShow
  )?.userRating;

  let title = shows.find((show) => show.imdbID === selectedShow)?.Title;

  function addHandle(fn) {
    const newWatched = {
      imdbID: selectedShow,
      Title: showDetails.Title,
      Year: showDetails.Year,
      Poster: showDetails.Poster,
      userRating: userRating,
      Runtime: showDetails.Runtime,
      liked: isLiked,
    };

    fn(newWatched);
    setUserRating(0);
  }

  useEffect(
    function () {
      async function getShowDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedShow}&plot=full&`
        );
        const data = await res.json();

        setShowDetails(data);
        setIsLoading(false);
        // console.log(showDetails);
      }

      getShowDetails();
    },
    [selectedShow]
  );

  useEffect(
    function changePageTitle() {
      if (!title) return;
      document.title = `Show | ${title}`;

      return () => (document.title = "ShowSlayer");
    },
    [title]
  );

  return (
    <div className="opened-show-box">
      {isLoading && <Loader />}
      {/* {error && <Error msg={error} />} */}
      {!isLoading && (
        <>
          <button className="back-btn" onClick={() => onBack(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="white"
              class="bi bi-arrow-left-circle-fill"
              viewBox="0 0 17 17"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </button>
          <div className="header-wrapper">
            <div className="hepl-me">
              <img
                src={showDetails.Poster}
                alt="sorry"
                className="poster-opened"
              />
              <div className="info-box open">
                <h3>{showDetails.Title}</h3>
                <div className="main-info-wrapper">
                  <p style={{ textAlign: "left" }}>{showDetails.Genre}</p>
                  <div className="rate-date-wr">
                    <p>
                      <span>📅</span>
                      {showDetails.Year}
                    </p>
                    <span>●</span>
                    <p>
                      <span>⭐</span> {showDetails.imdbRating}
                    </p>
                  </div>
                  <p>
                    Episode duration: <span>{showDetails.Runtime}s</span>
                  </p>
                </div>
              </div>
            </div>
            {!isLiked && (
              <button className="like-btn" onClick={() => addHandle(onLike)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="red"
                  class="bi bi-heartbreak-fill"
                  viewBox="0 0 17 17"
                >
                  <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
                </svg>
              </button>
            )}
            {isLiked && (
              <button className="like-btn disabled" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="red"
                  class="bi bi-heart-fill"
                  viewBox="0 0 17 17"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="text-info-wrap">
            <p className="plot">
              <span className="tab"></span>
              {showDetails.Plot}
            </p>
            <p>
              <ins>Starring:</ins> {showDetails.Actors}
            </p>
          </div>
          {!isWatched ? (
            <>
              <StarRating key={showDetails.imdbID} onRate={setUserRating} />
              {userRating > 0 && (
                <button
                  className="watched-btn"
                  onClick={() => addHandle(onWatched)}
                >
                  + Mark as watched
                </button>
              )}
            </>
          ) : (
            <p style={{ color: "whitesmoke", marginTop: "15px" }}>
              You've rated this show {watchedUserRating}!
            </p>
          )}
        </>
      )}
    </div>
  );
}

function Error({ msg }) {
  return <p className="error">{msg}</p>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

export default Home;
