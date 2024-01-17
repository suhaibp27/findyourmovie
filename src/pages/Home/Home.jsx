import "./Home.css";
import image from "../../assets/image.jpg";
import Hero from "../../components/Hero/Hero";
import Trending from "../../components/Trending/Trending";

const Home = () => {
  return (
    <div className="homeWrapper">
      <Hero />
      <Trending />
    </div>
  );
};

export default Home;
