import Nav from "./Nav/Nav.jsx"
import GraphParent from "./Graph/GraphParent.jsx"
import Home from "./Home/Home.jsx"
import Profile from "./Profile/Profile.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const Components = ({ user, onLogout }) => {
  console.log("Logged-in user:", user);
    //set up routing
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphs" element={<GraphParent />} />
        <Route path="/profile" element={<Profile onLogout={onLogout} />} />
      </Routes>
      <Nav />
      <footer className="buffer" />
    </Router>
   )
}

export default Components;