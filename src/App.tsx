import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar/Navbar";
// import DevModePrompt from "./Components/DevModePrompt";
import { SmoothCursor } from "./Components/ui/smooth-cursor";

const App = () => {
  // Change Document Title Based on Route
  const location = useLocation();
  // const [acceptedDevMode, setAcceptedDevMode] = useState(false);
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/":
        document.title = "Web + Graphic Designer | Abhijith Gaganan";
        break;
      case "/contact":
        document.title = "Contact | Abhijith Gaganan";
        break;
      default:
        document.title = "404 Not Found | Abhijith Gaganan";
    }
  });

  // const isDevMode = import.meta.env.VITE_IS_IN_DEVELOPMENT;

  return (
    <>
      {/* <SmoothCursor /> */}
      {/* {isDevMode && !acceptedDevMode && (
        <DevModePrompt
          title="Developer Mode Enabled"
          message="This website is still under Development and you are running this portfolio in developer mode. Some features may not work as expected. Do you want to proceed?"
          onConfirm={() => setAcceptedDevMode(true)}
          onCancel={() => setAcceptedDevMode(true)}
        />
      )} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
