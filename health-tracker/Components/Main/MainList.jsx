import React, { useEffect, useState } from "react";
import {
  getAllLessons,
  getById,
  createLesson,
  removeLesson
} from "../../Common/Services/LearnService";
import MainForm from "./MainForm";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  // Variables in the state to hold data
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [name, setName] = useState();

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getAllLessons().then((lessons) => {
      console.log(lessons);
      setLessons(lessons);
    });

    // getById("OXsgE8Mhjc").then((lesson) => {
    //   console.log(lesson);
    //   setLesson(lesson);
    // });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState("");

  // UseEffect that runs when changes
  // are made to the state variables/flags
  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (name && add) {
      createLesson(name).then((newLesson) => {
        setAdd(false);
        // Add the newly created lesson to the lessons array
        // to render the new list of lessons (thru spread/concatination)
        setLessons([...lessons, newLesson]);

        //Note: CANNOT MANIPULATE STATE ARRAY DIRECTLY
        //lessons = lessons.push(lesson)
        //setLessons(lessons)
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old lessons list to take out selected lesson
      const newLessons = lessons.filter((lesson) => lesson.id !== remove);
      setLessons(newLessons);

      removeLesson(remove).then(() => {
        console.log("Removed lesson with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [name, lessons, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    // Trigger add flag to create lesson and
    // re-render list with new lesson
    setAdd(true);
  };

  // Handler to track changes to the child input text
  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // Continuously updating name to be added on submit
    setName(e.target.value);
  };

  return (
    <div>
      <hr />
      This is the main list parent component.
      <div>
        {lessons.length > 0 && (
          <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              {lesson.get("name")}
              <button
                onClick={() => setRemove(lesson.id)}
                className="delete-button" // use className here!
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        
        )}
      </div>
      <div>
        <p> Lesson by ID: </p>
        {/* Check that the lesson object exists */}
        {Object.keys(lesson).length > 0 && (
          <ul>
            {/* Using getter for lesson Object to display name */}
            {lessons.map((lesson) => (
              <li key={"1" + lesson.id}> {lesson.id} </li>
            ))}
          </ul>
        )}
      </div>
      {/* Stateless Child component passing up events from form */}
      <MainForm onClick={onClickHandler} onChange={onChangeHandler} />
    </div>
  );
};

export default MainList;
