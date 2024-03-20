import { useEffect, useState } from "react";
import "./Genres.css";
import axios from "axios";

const Genres = ({ type, setGenreforURL, setPage }) => {
  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );
    setGenres(data.genres);
    // console.log(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    setGenreforURL("");
    setPage(1);
  }, [type]);

  const handleClick = (id) => {
    setGenres((prevArr) =>
      prevArr.map((obj) => {
        return obj.id === id ? { ...obj, selected: !obj.selected } : obj;
      })
    );
  };

  useEffect(() => {
    updateGenreUrl();
  }, [genres]);
  const updateGenreUrl = () => {
    const genreIds = genres.map((g) => {
      if (g.selected) return g.id;
    });
    setGenreforURL(
      genreIds.length > 0
        ? genreIds.reduce((acc, curr) => acc + "," + curr)
        : ""
    );
    setPage(1);
  };
  return (
    <div className="innerWidth genreContainer">
      {genres &&
        genres.map((genre) => (
          <button
            className={genre.selected ? "genre active" : "genre"}
            key={genre.id}
            onClick={() => handleClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
    </div>
  );
};

export default Genres;
