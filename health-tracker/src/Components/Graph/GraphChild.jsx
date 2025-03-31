import React from "react";

/* STATELESS CHILD COMPONENT */
const GraphChild = ({ keyword }) => {
    //send (possibly modified) keyword to AI to generate graph
  return (
    <div>
        <h3 class="graphTitle">{keyword}</h3>
      <img class="graphImage" src="/vite.svg" alt={keyword} />
    </div>
  );
};

export default GraphChild;
