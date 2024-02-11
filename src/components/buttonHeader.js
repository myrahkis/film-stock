import React from "react";
import "./buttonHeader.css";

function ButtonHeader({ children, opened, setter }) {
  return (
    <button
      className={opened !== true ? "btn-home" : "btn-header-opened"}
      onClick={setter}
    >
      <h3>{children}</h3>
    </button>
  );
}

export default ButtonHeader;
