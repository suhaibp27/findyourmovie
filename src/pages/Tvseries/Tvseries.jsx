import { useEffect, useState } from "react";
import "./Tvseries.css";
import axios from "axios";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Tvseries = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTvSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_API_KEY
      }&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );

    setTotalPages(data.total_pages <= 500 ? data.total_pages : 500);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTvSeries();
  }, [page]);
  return (
    <div className="innerWidth tvWrapper">
      <h1 className="pageTitle">Tv Series</h1>
      <div className="tvContainer">
        {content &&
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
      {totalPages > 1 && (
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
};

export default Tvseries;
