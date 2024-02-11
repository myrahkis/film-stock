import React, { useState } from "react";
import "./home.css";
import StarRating from "./starRating";

const defaultShows = [
  {
    imdbID: "tt1520211",
    title: "The walking dead",
    year: "2010",
    img: "https://www.filmtv.it/imgbank/GALLERYXL/R201512/walking-dead_00.jpg",
    runtime: 44,
    rating: 8.1,
    userRating: 7.5,
  },
  {
    imdbID: "tt0903747",
    title: "Breaking Bad",
    year: "2008",
    img: "https://www.filmtv.it/imgbank/GALLERYXL/R201605/00-40.jpg",
    runtime: 45,
    rating: 9.5,
    userRating: 9.5,
  },
  {
    imdbID: "tt0413573",
    title: "Grey's Anatomy",
    year: "2005",
    img: "https://www.filmtv.it/imgbank/GALLERYXL/R201608/grey00.jpg",
    runtime: 41,
    rating: 7.5,
    userRating: 6.2,
  },
];

function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function openHadle(show) {
    setOpen(true);
    setSelected(show);
    console.log(show);
  }

  return (
    <>
      {!open && <h2>Hits</h2>}
      <div className="boxes-wrapper">
        <ul className={!open ? "list" : "list-box"}>
          {defaultShows.map((show) => (
            <li className={!open ? "show" : "show-box"} key={show.imdbID}>
              <img
                src={show.img}
                alt="sorry"
                className={!open ? "poster" : "poster-box"}
              />
              <div className="info-box">
                <p
                  role="button"
                  onClick={() => openHadle(show)}
                  style={{ cursor: "pointer" }}
                >
                  {show.title}
                </p>
                <div className={!open ? "wrapper-closed" : "wrapper-box"}>
                  <p>
                    <span>📅</span>
                    {show.year}
                  </p>
                  <p>
                    <span>⭐</span> {show.rating}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {open && (
          <RateAShow selectedShow={selected} onBack={setOpen}></RateAShow>
        )}
      </div>
    </>
  );
}

function RateAShow({ selectedShow, onBack }) {
  return (
    <div className="opened-show-box">
      <button className="back-btn" onClick={() => onBack(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </button>
      <div className="header-wrapper">
        <img src={selectedShow.img} alt="sorry" className="poster-opened" />
        <div className="info-box">
          <h3>{selectedShow.title}</h3>
          <div className="">
            <p>
              <span>📅</span>
              {selectedShow.year}
            </p>
            <p>
              <span>⭐</span> {selectedShow.rating}
            </p>
          </div>
        </div>
      </div>
      <StarRating />
    </div>
  );
}

export default Home;
