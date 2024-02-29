import { useEffect, useRef } from "react";
import "./header.css";

function Header({ search, setSearch, results, defaultShows, children }) {
  const inputEl = useRef(null);

  useEffect(function () {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setSearch("");
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, [setSearch]);

  return (
    <div className="header">
      <div className="btns">
        <div className="logo">
          <img
            src="https://cdn0.iconfinder.com/data/icons/goofy-international-food-color/96/Popcorn-1024.png"
            alt="img"
            className="icon"
          />
          {children}
        </div>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search a TV show..."
        className={
          results === defaultShows ? "search search-default" : "search"
        }
        ref={inputEl}
      ></input>
      {results !== defaultShows && <p>Found {results.length} results</p>}
    </div>
  );
}

export default Header;
