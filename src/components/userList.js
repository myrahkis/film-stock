import React from "react";
import "./userList.css";

function UserList({ list }) {
  return (
    <ul className="list-watched">
      {list?.map((show) => (
        <li className="watched-show">
          <img src={show.Poster} alt="sorry" className="poster-watched" />
          <div className="info-box open">
            <h3>{show.Title}</h3>
            <div className="main-info-wrapper">
              <p style={{ textAlign: "left" }}>{show.Genre}</p>
              <div className="rate-date-wr">
                <p>
                  <span>📅</span>
                  {show.Year}
                </p>
                <span>●</span>
                <p>
                  <span>⭐</span> {show.imdbRating}
                </p>
              </div>
              <p>
                Episode duration: <span>{show.Runtime}s</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
