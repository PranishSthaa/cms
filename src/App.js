import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return <>
    <div className="overflow-hidden position-relative">
      <Navbar />
      <Signup />
      <Footer />
    </div>
  </>;
}

export default App;
