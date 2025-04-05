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
  );
  
  
}

export default App;
