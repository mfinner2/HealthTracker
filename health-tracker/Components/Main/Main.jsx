import React, { useEffect, useState } from "react";
import MainList from "./MainList";
import { createLesson, getAllLessons } from "../../Common/Services/LearnService";
import chat from "../openai/Interface";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const MainModule = () => {
  console.log("Hi");
  const [Lessons, setLessons] = useState([]);
  useEffect(()=> {
    if (Lessons.collection.length){
      setLessons(Lessons.collection);
    }else{
      getAllLessons().then((lessons) => {
        console.log(lessons);
        setLessons(lessons);
      });
    }

    
    // Call OpenAI API
  chat().then((response) => {
    console.log("OpenAI says:", response);
  });
  }, []);
  
  return (
    <div>
      This is the main module.
      <MainList />
    </div>
  );
};

export default MainModule;
