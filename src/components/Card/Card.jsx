import { FaStar } from "react-icons/fa";
import "./Card.css";
import { img_500, unavailable } from "../../config/config";
import { useState } from "react";
import CardModal from "./CardModal";

const Card = ({ id, media_type, title, date, poster_path, rating }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="cardContainer"
        onClick={() => {
          setShowModal(true);
          document.body.style.overflow = "hidden";
          // document.querySelector(".cardDetailsCast").style.overflow = "scroll";
        }}
      >
        <img
          className="cardImage"
          src={poster_path ? `${img_500}${poster_path}` : unavailable}
          alt={title}
        />
        <div className="cardBottom">
          <h3 className="cardTitle">{title}</h3>
          <div className="cardDetails">
            <p className="cardYear">{new Date(date).getFullYear()}</p>
            <p className="cardRating">
              <FaStar className="cardStar" />
              <span
                className={
                  Math.round(rating * 10) / 10 >= 6 ? "" : "cardLowRating"
                }
              >
                {Math.round(rating * 10) / 10}
              </span>
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <CardModal
          id={id}
          media_type={media_type}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default Card;
