import React from "react";

/* STATELESS CHILD COMPONENT */
const MainForm = ({ onChange, onClick }) => {
  return (
    <div>
      <hr />
      This is the main form child component.
      <form>
        <input text="test" onChange={onChange} />
        <button type="submit" onChange={onClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MainForm;
