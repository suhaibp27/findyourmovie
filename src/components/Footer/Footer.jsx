import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="innerWidth footerContainer">
        <div className="footerTop">
          <Link to="/" onClick={() => window.scroll(0, 0)}>
            Home
          </Link>
          <Link to="/movies" onClick={() => window.scroll(0, 0)}>
            Movies
          </Link>
          <Link to="/tvseries" onClick={() => window.scroll(0, 0)}>
            Tv Series
          </Link>
          <Link to="/search" onClick={() => window.scroll(0, 0)}>
            Search
          </Link>
        </div>
        <div className="footerBottom">
          <p>2023 &copy; All Right Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
