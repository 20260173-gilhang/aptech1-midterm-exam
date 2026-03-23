import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          My Web
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/success" className="navbar-link">
              Success
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;