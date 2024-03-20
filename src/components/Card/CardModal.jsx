import "./CardModal.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  img_300,
  img_500,
  noPicture,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { FaPlay, FaPlus, FaTimes } from "react-icons/fa";

const CardModal = ({ id, media_type, setShowModal }) => {
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState(null);
  const [credits, setCredits] = useState(null);

  const fetchData = async () => {
    if (media_type && id) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );

      setContent(data);
      //   console.log(data);
    }
  };

  const fetchVideo = async () => {
    if (media_type && id) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );

      setVideo(data.results[0]?.key);
      //   console.log(data);
    }
  };

  const fetchCredits = async () => {
    if (media_type && id) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );
      setCredits(data.cast);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    fetchCredits();
  }, []);
  return (
    <div className="cardModal active">
      <div className="cardModalContent">
        {content && (
          <>
            <img
              className="cardModalImg"
              src={
                content.poster_path
                  ? `${img_500}${content.poster_path}`
                  : unavailable
              }
              alt={content.title || content.name}
            />
            <img
              className="cardModalImgMobile"
              src={
                content.poster_path
                  ? `${img_500}${content.backdrop_path}`
                  : unavailableLandscape
              }
              alt={content.title || content.name}
            />
            <div className="cardModalDetails">
              <h3>
                {content.title || content.name} (
                {(
                  content.release_date ||
                  content.first_air_date ||
                  "----"
                ).substring(0, 4)}
                )
              </h3>
              <i>{content.tagline}</i>
              <p>{content.overview}</p>
              <div className="cardDetailsCast">
                {credits &&
                  credits.map((cast) => (
                    <div
                      key={`${cast.id}${cast?.name}`}
                      className="cardDetailsCastItem"
                    >
                      <img
                        src={
                          cast.profile_path
                            ? `${img_300}/${cast.profile_path}`
                            : noPicture
                        }
                        alt={cast?.name}
                      />
                      <div className="cardDetailsCastName">
                        <p>{cast?.name}</p>
                      </div>
                      {/* <b>{cast?.name}</b> */}
                    </div>
                  ))}
              </div>
              <div className="cardModalDetailsButtonContainer">
                {video && (
                  <a
                    className="cardDetailsButton cardDetailsButtonPrimary"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    target="--blank"
                  >
                    <FaPlay className="cardDetailsIcon" /> WATCH TRAILER
                  </a>
                )}
                <button className="cardDetailsButton">
                  <FaPlus className="cardDetailsIcon" /> ADD LIST
                </button>
              </div>
            </div>
          </>
        )}
        <button
          className="cardModalCloseButton"
          onClick={() => {
            setShowModal(false);
            document.body.style.overflow = "auto";
          }}
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardModal;
