import React from "react";

function ButtonHeader({ children, opened, setter }) {
  const style = {
    border: "none",
    backgroundColor: "#004d5c",
    color: opened !== true ? "aliceblue" : "#fb9038",
    marginLeft: "15px",
    cursor: "pointer",
  };

  return (
    <button style={style} onClick={setter}>
      <h3>{children}</h3>
    </button>
  );
}

export default ButtonHeader;
