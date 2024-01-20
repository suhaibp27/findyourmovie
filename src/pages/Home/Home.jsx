import "./Home.css";
import image from "../../assets/image.jpg";
import Hero from "../../components/Hero/Hero";
import Trending from "../../components/Trending/Trending";
import HomeMain from "../../components/HomeMain/HomeMain";

const Home = () => {
  return (
    <div className="homeWrapper">
      <Hero />
      <Trending />
      <HomeMain />
    </div>
  );
};

export default Home;
