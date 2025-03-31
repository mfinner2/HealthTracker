import React, { useEffect } from "react";
import MainList from "./MainList";
import { createLesson, getAllLessons } from "../../Common/Services/LearnService";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const MainModule = () => {
  const [lessons, setLessons] = useState([]);
  useEffect(()=> {
    if (Lessons.collection.length){
      setLessons(Lessons.collection);
    }else{
      getAllLessons().then((lessons) => {
        console.log(lessons);
        setLessons(lessons);
      });
    }
  }, []);
  
  return (
    <div>
      This is the main module.
      <MainList />
    </div>
  );
};

export default MainModule;
