import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from "react";

//import Components from "../Components/Components";
//import * as Env from "./environments";
import Parse from "parse/dist/parse.min.js";

const getAllUsers = (myPost) => {
  const User = Parse.Object.extend("_User");
  const query = new Parse.Query(User);
  query.equalTo("post", myPost);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};
const Env  = {
  APPLICATION_ID: "Ga7GJjsK6m7JXDd1kWiM52Uy1K0Y6otOvWpcoHgm",
  JAVASCRIPT_KEY: "mHUDGRFFaaXDN7za30sURxJGhAztE295il1gFTxz",
  SERVER_URL: "https://parseapi.back4app.com/"
}

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;


console.log(" Parse initialized");
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
  return <h1>Hello, Parse!</h1>;
  
  
}

export default App;
