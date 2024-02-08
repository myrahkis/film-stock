import React, { useState } from "react";
import "./header.css";

function Header() {
  const [search, setSearch] = useState("");

  return (
    <div className="header">
      <div className="btns">
        <div className="logo">
          <img
            src="https://cdn0.iconfinder.com/data/icons/goofy-international-food-color/96/Popcorn-1024.png"
            alt="img"
            className="icon"
          />
          <button className="btn-header">
            <h3>ShowSlayer</h3>
          </button>
        </div>
        <button className="btn-header" style={{marginRight: '15px'}}><h4>Watched</h4></button>
        <button className="btn-header"><h4>Favourites</h4></button>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search a TV show..."
        className="search"
      ></input>
      <p>Found N results</p>
    </div>
  );
}

export default Header;