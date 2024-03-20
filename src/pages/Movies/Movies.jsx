import { useEffect, useState } from "react";
import "./Movies.css";
import axios from "axios";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );

    setTotalPages(data.total_pages <= 500 ? data.total_pages : 500);
    setContent(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);
  return (
    <div className="innerWidth movieWrapper">
      <h1 className="pageTitle">Movies</h1>
      <div className="movieContainer">
        {content &&
          content.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              media_type="movie"
              title={item.title || item.name}
              date={item.release_date || item.first_air_date}
              poster_path={item.poster_path}
              rating={item.vote_average}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
};

export default Movies;
