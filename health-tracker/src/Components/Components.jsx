import Nav from "./Nav/Nav.jsx"
import GraphParent from "./Graph/GraphParent.jsx"
import Home from "./Home/Home.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const Components = () => {
    //set up routing
   return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphs" element={<GraphParent />} />
      </Routes>
    </Router>
   )
}

export default Components;