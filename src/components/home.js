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
      {!open && <h2>Hits</h2>}
      {isLoading && <Loader />}
      {error && <Error msg={error} />}
      {!isLoading && !error && (
        <div className="boxes-wrapper">
          <ul className={!open ? "list" : "list-box"}>
            {shows?.map((show) => (
              <li className={!open ? "show" : "show-box"} key={show.imdbID}>
                <img
                  src={show.Poster}
                  alt="sorry"
                  className={!open ? "poster" : "poster-box"}
                />
                <div className="info-box">
                  <p
                    role="button"
                    onClick={() => openHadle(show)}
                    style={{ cursor: "pointer" }}
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
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left-circle"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </button>
      <div className="header-wrapper">
        <img src={showDetails.Poster} alt="sorry" className="poster-opened" />
        <div className="info-box">
          <h3>{showDetails.Title}</h3>
          <div className="">
            <p>
              <span>📅</span>
              {showDetails.Year}
            </p>
            <p>
              <span>⭐</span> {showDetails.imdbRating}
            </p>
            <p>
              Episode duration: <span>{showDetails.Runtime}s</span>
            </p>
            <p>{showDetails.Genre}</p>
          </div>
        </div>
      </div>
      <p>{showDetails.Plot}</p>
      <p>Starring: {showDetails.Actors}</p>
      <StarRating key={showDetails.imdbID}/>
    </div>
  );
}

export default Home;
