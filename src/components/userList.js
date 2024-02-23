import React from "react";
import "./userList.css";

function UserList({ list, onDelete }) {

  return (
    <ul className="list-watched">
      {list?.map((show) => (
        <li className="watched-show" key={show.imdbID}>
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
                  <span>⭐</span> {show.userRating}
                </p>
              </div>
              <p>
                Episode duration: <span>{show.Runtime}s</span>
              </p>
              <button className="remove-btn" onClick={() => onDelete(show.imdbID)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgb(215, 19, 19)"
                  className="bi bi-x-circle-fill btn-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
