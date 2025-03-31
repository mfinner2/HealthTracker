import Nav from "./Nav/Nav.jsx"
import GraphParent from "./Graph/GraphParent.jsx"
import Home from "./Home/Home.jsx"
import Profile from "./Profile/Profile.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const Components = () => {
    //set up routing
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphs" element={<GraphParent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Nav />
      <footer class="buffer" />
    </Router>
   )
}

export default Components;