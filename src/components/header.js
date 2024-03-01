import { useEffect, useRef } from "react";
import "./header.css";

function Header({
  search,
  setSearch,
  results,
  defaultShows,
  collapseMenu,
  onCollapse,
  setCollapseMenu,
  children,
}) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setSearch("");
          setCollapseMenu(false);
        }
      }
      document.addEventListener("keydown", callback);

      return () => document.addEventListener("keydown", callback);
    },
    [setSearch, setCollapseMenu]
  );

  return (
    <div className="header">
      <button className="collapse-btn" onClick={onCollapse}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>
      {collapseMenu && <div className="collapse-menu">{children}</div>}
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
      {results !== defaultShows && (
        <p className="search-count">Found {results.length} results</p>
      )}
    </div>
  );
}

export default Header;
