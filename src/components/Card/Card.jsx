import { FaStar } from "react-icons/fa";
import "./Card.css";
import { img_500 } from "../../config/config";

const Card = ({ title, date, poster_path, rating }) => {
  return (
    <div className="cardContainer">
      <img className="cardImage" src={`${img_500}${poster_path}`} alt={title} />
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
  );
};

export default Card;
