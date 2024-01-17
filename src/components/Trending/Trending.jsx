import { useEffect, useRef, useState } from "react";
import "./Trending.css";
import axios from "axios";
import Card from "../Card/Card";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
// import { GrPrevious, GrNext } from "react-icons/gr";
import { IoMdTrendingUp } from "react-icons/io";
import { HiFire } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { PiFilmReelFill } from "react-icons/pi";
// import { swiperSettings } from "../../utils/common";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState("trending");
  // const swiperRef = useRef(null);

  const handleSelect = (e) => {
    setSelected(e.target.name);
  };

  const fetchTrending = async () => {
    switch (selected) {
      case "trending":
        var api = `https://api.themoviedb.org/3/trending/all/day?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=1`;
        break;
      case "popularMovies":
        var api = `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`;
        break;
      case "popularTvSeries":
        var api = `https://api.themoviedb.org/3/tv/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`;
        break;
      case "nowPlaying":
        var api = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`;
        break;
      default:
        var api = `https://api.themoviedb.org/3/trending/all/day?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=1`;
    }
    const { data } = await axios.get(api);

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    goToFirstSlide();
  }, [selected]);

  const goToFirstSlide = () => {
    // if (swiperRef.current && swiperRef.current.swiper) {
    //   swiperRef.current.swiper.slideTo(0);
    // }
    document.querySelector(".trendingCardContainer").scroll(0, 0);
  };

  return (
    <div className="trendingWrapper">
      <div className=" innerWidth trendingHeader">
        <ul className="trendingList">
          <li className="trendingListItem">
            <button
              className={
                selected == "trending"
                  ? "trendingListItemButton active"
                  : "trendingListItemButton"
              }
              onClick={handleSelect}
              name="trending"
            >
              <IoMdTrendingUp /> Trending Now
            </button>
          </li>
          <li className="trendingListItem">
            <button
              className={
                selected == "popularMovies"
                  ? "trendingListItemButton active"
                  : "trendingListItemButton"
              }
              onClick={handleSelect}
              name="popularMovies"
            >
              <HiFire /> Popular Movies
            </button>
          </li>
          <li className="trendingListItem">
            <button
              className={
                selected == "popularTvSeries"
                  ? "trendingListItemButton active"
                  : "trendingListItemButton"
              }
              onClick={handleSelect}
              name="popularTvSeries"
            >
              <FaStar /> Popular Tv Series
            </button>
          </li>
          <li className="trendingListItem">
            <button
              className={
                selected == "nowPlaying"
                  ? "trendingListItemButton active"
                  : "trendingListItemButton"
              }
              onClick={handleSelect}
              name="nowPlaying"
            >
              <PiFilmReelFill /> Now Playing
            </button>
          </li>
        </ul>
      </div>
      <div className="innerWidth trendingCardContainer">
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

        {/* <Swiper {...swiperSettings} ref={swiperRef}>
          <SwiperButtons />
          {content &&
            content.map((item) => (
              <SwiperSlide key={item.id}>
                <Card
                  title={item.title || item.name}
                  date={item.release_date || item.first_air_date}
                  poster_path={item.poster_path}
                  rating={item.vote_average}
                />
              </SwiperSlide>
            ))}
        </Swiper> */}
      </div>
    </div>
  );
};

// const SwiperButtons = () => {
//   const swiper = useSwiper();
//   return (
//     <>
//       <button
//         className="trendingButton trendingPrevButton"
//         onClick={() => swiper.slidePrev()}
//       >
//         <GrPrevious />
//       </button>
//       <button
//         className="trendingButton trendingNextButton"
//         onClick={() => swiper.slideNext()}
//       >
//         <GrNext />
//       </button>
//     </>
//   );
// };

export default Trending;
