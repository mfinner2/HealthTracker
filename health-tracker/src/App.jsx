import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

// theme found at https://bootswatch.com/minty/ 
import './theme/BootswatchBootstrapTheme.min.css';

//import Components from "../Components/Components";
//import * as Env from "./environments";
//import GraphParent from './Components/Graph/GraphParent';
import Parse from '../Common/Services/parseConfig';
import Components from './Components/Components';

const getAllUsers = (myPost) => {
  const User = Parse.Object.extend("_User");
  const query = new Parse.Query(User);
  query.equalTo("post", myPost);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};

function App() {
  //const [count, setCount] = useState(0)
  const [users, setLessons] = useState([]);
  console.log("text printed");
  //return <Components />;

  useEffect(() => {
    getAllUsers().then((users) => {
      console.log(users);
      setLessons(users);
    });

    // getById("OXsgE8Mhjc").then((lesson) => {
    //   console.log(lesson);
    //   setLesson(lesson);
    // });
  }, []);
  return <Components />;
  
  
}

export default App;
