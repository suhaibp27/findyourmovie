import { useEffect, useState } from "react";
import "./Search.css";
import { FiSearch } from "react-icons/fi";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import axios from "axios";
import Card from "../../components/Card/Card";

const Search = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("movie");

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setTotalPages(data.total_pages <= 500 ? data.total_pages : 500);
    setContent(data.results);
  };

  useEffect(() => {
    fetchSearch();
  }, [page, type]);
  return (
    <div className="searchWrapper">
      <h1 className="pageTitle">Search</h1>
      <div className="innerWidth homeMainSearch">
        <div className="homeMainSearchForm">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={fetchSearch}>
            <FiSearch />
          </button>
        </div>
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
          {searchText &&
            content.length == 0 &&
            (type === "movie" ? (
              <h2>No Movies Found</h2>
            ) : (
              <h2>No Series Found</h2>
            ))}
          <div className="homeMainSearchContents">
            {content.length > 0 &&
              content.map((item) => (
                <Card
                  key={item.id}
                  title={item.title || item.name}
                  date={item.release_date || item.first_air_date}
                  poster_path={item.poster_path}
                  rating={item.vote_average}
                />
              ))}
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
};

export default Search;
