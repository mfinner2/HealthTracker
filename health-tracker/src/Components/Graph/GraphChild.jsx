import React from "react";

/* STATELESS CHILD COMPONENT */
const GraphChild = ({ keyword }) => {
    //send (possibly modified) keyword to AI to generate graph
  return (
    <div>
        <h3>{keyword}</h3>
      <img src="generated.jpg" alt={keyword} />
    </div>
  );
};

export default GraphChild;
