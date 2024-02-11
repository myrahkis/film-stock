import React from "react";
import "./home.css";

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
  return (
    <>
      <h2>Hits</h2>
      <ul className="list">
        {defaultShows.map((show) => (
          <li className="show">
            <p>{show.title}</p>
            <img src={show.img} alt="sorry" className="poster" />
            <p>{show.year}</p>
            <p>
              <span>⭐</span> {show.rating}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function RateAShow() {
  
}

export default Home;
