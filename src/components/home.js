import React, { useEffect, useState } from "react";
import "./home.css";
import StarRating from "./starRating";

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

const KEY = "affef0d";

function Home({ searchShow }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function openHadle(show) {
    setOpen(true);
    setSelected(show.imdbID);
    // console.log(show);
  }

  useEffect(
    function () {
      async function fetchShows() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${searchShow}&type=series`
          );

          if (!res.ok)
            throw new Error("Something went wrong with shows loading:(");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error("Cannot find the show");

          setShows(data.Search);
        } catch (e) {
          console.log(e.message);
          setError(e.message);
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
    },
    [searchShow]
  );

  return (
    <>
      {shows === defaultShows ? (
        <h2 style={{ marginBottom: "10px", color: "aliceblue" }}>Hits</h2>
      ) : (
        <h2 style={{ marginBottom: "10px", color: "aliceblue" }}>
          Search results
        </h2>
      )}
      {isLoading && <Loader />}
      {error && <Error msg={error} />}
      {!isLoading && !error && (
        <div className="boxes-wrapper">
          <ul className={!open ? "list" : "list-box"}>
            {shows?.map((show) => (
              <li className={!open ? "show" : "show-box"} key={show.imdbID}>
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
                    onClick={() => openHadle(show)}
                    style={{
                      cursor: "pointer",
                      maxWidth: "190px",
                      textWrap: "wrap",
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
            ></RateAShow>
          )}
        </div>
      )}
    </>
  );
}

function Error({ msg }) {
  return <p className="error">{msg}</p>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function RateAShow({ selectedShow, onBack }) {
  const [showDetails, setShowDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="opened-show-box">
      {isLoading && <Loader />}
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
        <img src={showDetails.Poster} alt="sorry" className="poster-opened" />
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
      <div className="text-info-wrap">
        <p className="plot">
          <span className="tab"></span>
          {showDetails.Plot}
        </p>
        <p>
          <ins>Starring:</ins> {showDetails.Actors}
        </p>
      </div>
      <StarRating key={showDetails.imdbID} />
      <button className="watched-btn">+ Mark as watched</button>
    </div>
  );
}

export default Home;
