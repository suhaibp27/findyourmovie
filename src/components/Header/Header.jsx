import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import netflixLogo from "../../assets/Netflix-logo.png";
import netflixAvatar from "../../assets/Netflix-avatar.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const navref = useRef(false);

  const handleToggle = () => {
    navref.current.classList.toggle("responsiveNav");
  };

  const handleClose = () => {
    navref.current.classList.remove("responsiveNav");
  };

  const handleNavBackgroundChange = () => {
    if (window.scrollY > 120) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavBackgroundChange);
    return () => {
      window.removeEventListener("scroll", handleNavBackgroundChange);
    };
  }, []);

  return (
    <div className={showNav ? "headerWrapper darkBackground" : "headerWrapper"}>
      <div className="innerWidth headerContainer">
        <div className="headerLogo">
          <h3>
            <span>F</span>
            <span>Y</span>
            <span>M</span>
          </h3>
          <p>Find Your Movie</p>
        </div>
        <div ref={navref} className="headerRight">
          <ul className="headerMenu">
            <li className="headerMenuItem">
              <NavLink to="/" onClick={handleClose} activeclassname="active">
                Home
              </NavLink>
            </li>
            <li className="headerMenuItem">
              <NavLink
                to="/movies"
                onClick={handleClose}
                activeclassname="active"
              >
                Movies
              </NavLink>
            </li>
            <li className="headerMenuItem">
              <NavLink
                to="/tvseries"
                onClick={handleClose}
                activeclassname="active"
              >
                Tv Series
              </NavLink>
            </li>
            <li className="headerMenuItem">
              <NavLink
                to="/search"
                onClick={handleClose}
                activeclassname="active"
              >
                Search
              </NavLink>
            </li>
          </ul>
          <button className="headerButton headerCloseButton">
            <FaTimes size={30} onClick={handleToggle} />
          </button>
          <img className="headerAvatar" src={netflixAvatar} alt="User avatar" />
        </div>
        <button className="headerButton">
          <FaBars size={30} onClick={handleToggle} />
        </button>
      </div>
    </div>
  );
};

export default Header;
