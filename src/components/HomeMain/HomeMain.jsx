import { useEffect, useState } from "react";
import "./HomeMain.css";
import { BiMoviePlay } from "react-icons/bi";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Card from "../Card/Card";
import { FaPlus } from "react-icons/fa";
import Genres from "../Genres/Genres";

const HomeMain = () => {
  const [selected, setSelected] = useState("movie");
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [genreforURL, setGenreforURL] = useState("");
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("movie");

  const handleSelect = (e) => {
    setSearchText("");
    setType("movie");
    setContent([]);
    setTotalPages(0);
    setSelected(e.target.name);
    setPage(1);
  };

  const fetchData = async () => {
    switch (selected) {
      case "movie":
        var api = `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`;
        // &with_genres=${genreforURL}
        break;
      case "tv":
        var api = `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`;
        // &with_genres=${genreforURL}
        break;
      default:
        var api = `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
    }
    const { data } = await axios.get(api);

    setTotalPages(data.total_pages < 3 ? data.total_pages : 3);
    if (page == 1) setContent(data.results);
    else setContent([...content, ...data.results]);
  };

  useEffect(() => {
    if (selected !== "search") fetchData();
    // goToFirstSlide();
  }, [selected, page, genreforURL]);

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setTotalPages(data.total_pages < 3 ? data.total_pages : 3);
    setContent(data.results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearch();
  };

  useEffect(() => {
    fetchSearch();
  }, [type]);

  return (
    <div className="homeMainWrapper">
      <div className=" innerWidth homeMainHeader">
        <ul className="homeMainList">
          <li className="homeMainListItem">
            <button
              className={
                selected == "movie"
                  ? "homeMainListItemButton active"
                  : "homeMainListItemButton"
              }
              onClick={handleSelect}
              name="movie"
            >
              <BiMoviePlay /> Movies
            </button>
          </li>
          <li className="homeMainListItem">
            <button
              className={
                selected == "tv"
                  ? "homeMainListItemButton active"
                  : "homeMainListItemButton"
              }
              onClick={handleSelect}
              name="tv"
            >
              <BsCollectionPlayFill /> Tv Series
            </button>
          </li>
          <li className="homeMainListItem">
            <button
              className={
                selected == "search"
                  ? "homeMainListItemButton active"
                  : "homeMainListItemButton"
              }
              onClick={handleSelect}
              name="search"
            >
              <FiSearch /> Search
            </button>
          </li>
        </ul>
      </div>
      {(selected === "movie" || selected === "tv") && (
        <div className="homeMainBottomContainer">
          <Genres
            type={selected}
            genreforURL={genreforURL}
            setGenreforURL={setGenreforURL}
            setPage={setPage}
          />
          <div className="innerWidth homeMainContainer">
            {content.length > 0 ? (
              content.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  media_type={selected}
                  title={item.title || item.name}
                  date={item.release_date || item.first_air_date}
                  poster_path={item.poster_path}
                  rating={item.vote_average}
                />
              ))
            ) : (
              <h3 className="homeMainNoData">No matching results</h3>
            )}
          </div>
          {totalPages > page && (
            <div className="homeMainLoad">
              <button onClick={() => setPage((prev) => prev + 1)}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      )}
      {selected === "search" && (
        <div className="innerWidth homeMainSearch">
          <form className="homeMainSearchForm" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>
          <div className="homeMainSearchType">
            <button
              onClick={() => setType("movie")}
              className={type === "movie" ? "active" : ""}
            >
              SEARCH MOVIES
            </button>
            <button
              onClick={() => setType("tv")}
              className={type === "tv" ? "active" : ""}
            >
              SEARCH TV SERIES
            </button>
          </div>
          <div className="homeMainSearchContainer">
            {content.length == 0 &&
              (type === "movie" ? (
                <h2>No Movies Found</h2>
              ) : (
                <h2>No Series Found</h2>
              ))}
            <div className="homeMainSearchContents">
              {content &&
                content.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    media_type={type}
                    title={item.title || item.name}
                    date={item.release_date || item.first_air_date}
                    poster_path={item.poster_path}
                    rating={item.vote_average}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMain;
