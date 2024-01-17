import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Tvseries from "./pages/Tvseries/Tvseries";
import Search from "./pages/Search/Search";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/movies" exact Component={Movies} />
          <Route path="/tvseries" exact Component={Tvseries} />
          <Route path="/search" exact Component={Search} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
