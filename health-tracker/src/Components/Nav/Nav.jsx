import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";


const Nav = () => {
  //hold links to allow for moving between pages
  return (
    <footer>
      <nav>
        <ul className="nav">
          <li>
            <Link to="/"><Icon.House size={36}/></Link>
          </li>
          <li>
          <Link to="/graphs"><Icon.Clipboard2Data size={36}/></Link>
          </li>
          <li>
          <Link to="/profile"><Icon.PersonFill size={36} /></Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Nav;

//<Link to="/">Home</Link>
//<Link to="/new">New Note</Link>