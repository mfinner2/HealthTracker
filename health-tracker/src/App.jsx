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
import UserAuth from './Components/UserAuth';
import { getCurrentUser } from '../Common/Services/authService';

<<<<<<< HEAD
// const getAllUsers = (myPost) => {
//   const User = Parse.Object.extend("_User");
//   const query = new Parse.Query(User);
//   query.equalTo("post", myPost);
//   return query.find().then((results) => {
//     // returns array of Lesson objects
//     return results;
//   });
// };

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const current = getCurrentUser();
    if (current) {
      setUser(current);
    }
  }, []);

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  }


  return (
    <div className='container mt-4'>
      {user ? (
        <Components user={user} onLogout={handleLogout}/>
      ) : (
        <UserAuth onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
=======


///////////////////LearnServices.js file
const getAllUsers = (myPost) => {
  const User = Parse.Object.extend("_User");
  const query = new Parse.Query(User);
  query.equalTo("post", myPost);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};

const createUser = (username, password, email) => {
  const user = new Parse.User();

  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  return user.signUp().then((user) => {
    console.log("✅ User created:", user);
    return user;
  }).catch((error) => {
    console.error("❌ Error creating user:", error.message);
  });
};
////////////////////////

////////////////environments.js file
const Env  = {
  APPLICATION_ID: "Ga7GJjsK6m7JXDd1kWiM52Uy1K0Y6otOvWpcoHgm",
  JAVASCRIPT_KEY: "mHUDGRFFaaXDN7za30sURxJGhAztE295il1gFTxz",
  SERVER_URL: "https://parseapi.back4app.com/"
}
/////////////////

// init parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;
//

console.log(" Parse initialized");
function App() {
  //const [count, setCount] = useState(0)
  const [users, setUsers] = useState([]);
  console.log("text printed");
  //return <Components />;

  /*useEffect(() => {
    getAllUsers().then((users) => {
      console.log(users);
      setUsers(users);
    });

    // getById("OXsgE8Mhjc").then((lesson) => {
    //   console.log(lesson);
    //   setLesson(lesson);
    // });
  }, []);
  return <Components />;
    
  }, []);*/
  // Handle button click
  const handleFetchUsers = () => {
    getAllUsers().then((results) => {
      console.log(" Users:", results);
      setUsers(results); // store in state to display
      //createUser("janedoe", "securepassword123", "janedoe@example.com");
    });
  };

  return (
    <Components/>
>>>>>>> pschrad2
  );
  
  
}

export default App;
