import { Link } from "react-router-dom";

const Nav = () => {
  //hold links to allow for moving between pages
  return (
    <footer>
      <nav>
        <ul className="nav">
          <li>
            <Link to="/"><img src="" alt="home" width="50" /></Link>
          </li>
          <li>
          <Link to="/graphs"><img src="" alt="graphs" width="50" /></Link>
          </li>
          <li>
          <Link to="/profile"><img src="" alt="profile" width="50" /></Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Nav;

//<Link to="/">Home</Link>
//<Link to="/new">New Note</Link>