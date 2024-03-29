import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import Swipercore, { Navigation } from "swiper";
import "swiper/css";
import "./Hero.css";
import axios from "axios";
import {
  img_1280,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { FaPlus, FaStar } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import CardModal from "../Card/CardModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=1`
    );

    // console.log(data.results.slice(0, 5));

    setContent(data.results.slice(0, 5));

    // data.results.slice(0, 5).map(async (item) => {
    //   console.log(item.media_type);
    //   const { videoData } = await axios.get(
    //     `https://api.themoviedb.org/3/${item.media_type}/${
    //       item.id
    //     }/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
    //   );

    //   console.log(videoData);
    // });
  };

  const handleWindowResize = () => {
    if (window.innerWidth < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    fetchTrending();
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div className="heroWrapper">
      <Swiper slidesPerView={1} loop>
        <SwiperButtons />

        {content.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="heroSlideCard">
              <div className="heroBackDrop"></div>
              <img
                className="heroSlideImage"
                src={
                  isMobile
                    ? item.poster_path
                      ? `${img_500}${item.poster_path}`
                      : unavailable
                    : item.backdrop_path
                    ? `${img_1280}${item.backdrop_path}`
                    : unavailableLandscape
                }
                alt=""
              />
              <div className="heroContent">
                <p className="heroRating">
                  <FaStar className="heroRatingStar" />{" "}
                  {Math.round(item.vote_average * 10) / 10}
                  <span className="heroMediaType">
                    {item.media_type == "tv" ? "TV Series" : "Movie"}
                  </span>
                </p>
                <h3 className="heroTitle">{item.title || item.name}</h3>
                <p className="heroDescription">{item.overview}</p>
                <div className="heroCardButtonConatainer">
                  <button
                    className="heroCardButton heroCardButtonPrimary"
                    onClick={() => setShowModal(true)}
                  >
                    <FaPlus className="heroIcon" /> VIEW MORE
                    {/* <FaPlay className="heroIcon" /> */}
                  </button>
                  <button className="heroCardButton">
                    <FaPlus className="heroIcon" /> ADD LIST
                  </button>
                </div>
              </div>
            </div>
            {showModal && (
              <CardModal
                id={item.id}
                media_type={item.media_type}
                setShowModal={setShowModal}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SwiperButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <button
        className="heroButton heroPrevButton"
        onClick={() => swiper.slidePrev()}
      >
        <GrPrevious />
      </button>
      <button
        className="heroButton heroNextButton"
        onClick={() => swiper.slideNext()}
      >
        <GrNext />
      </button>
    </>
  );
};

export default Hero;
