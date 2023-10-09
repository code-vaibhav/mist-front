import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Demo from "./pages/Demo";
import Jobs from "./pages/Jobs";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
